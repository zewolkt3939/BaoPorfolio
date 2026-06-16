// =====================================================
// Logic chính: đổi ngôn ngữ, render dữ liệu từ js/data.js,
// hiệu ứng fade-in nhẹ khi cuộn. Dark mode only.
// =====================================================

// ---------- i18n ----------
let lang = localStorage.getItem('lang') || 'vi';

function t(key) {
  const fromCurrent = key.split('.').reduce((o, k) => (o ? o[k] : undefined), I18N[lang]);
  if (fromCurrent !== undefined && fromCurrent !== null) return fromCurrent;
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), I18N.vi);
}

function applyLang() {
  document.documentElement.lang = lang;
  document.body.classList.toggle('is-en', lang === 'en');
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n);
    if (value) el.textContent = value;
  });
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = lang === 'vi' ? 'EN' : 'VI';
  renderAll();
}

function setLang(next) {
  lang = next;
  localStorage.setItem('lang', next);
  applyLang();
}

// ---------- Render helpers ----------
const pick = (v) => {
  if (v && typeof v === 'object') return v[lang] ?? v.vi ?? v.en ?? '';
  return v ?? '';
};
const list = (v) => (Array.isArray(v) ? v : []);

function renderCerts() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;
  grid.innerHTML = list(CERTIFICATES).map((c) => `
    <div class="card">
      ${c.image ? `<img class="card-image" src="${c.image}" alt="${c.name || 'Certificate image'}" loading="lazy" />` : ''}
      <span class="icon">${c.icon}</span>
      <h3>${c.name}</h3>
      <p class="meta">${c.issuer} · ${c.date}</p>
      <a class="card-link" href="${c.link}" target="_blank" rel="noopener">${t('certs.view')}</a>
    </div>`).join('');
}

function renderSkills() {
  const grid = document.getElementById('skillGrid');
  if (!grid) return;
  grid.innerHTML = list(SKILLS).map((g) => `
    <div class="card">
      <h3>${pick(g.group)}</h3>
      <div class="chips">${list(g.items).map((s) => `<span class="chip">${typeof s === 'object' ? (s.name ?? '') : s}</span>`).join('')}</div>
    </div>`).join('');
}

function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  grid.innerHTML = list(PROJECTS).map((p) => `
    <div class="card">
      ${p.image ? `<img class="card-image" src="${p.image}" alt="${pick(p.title) || 'Project image'}" loading="lazy" />` : ''}
      <h3>${pick(p.title)}</h3>
      <p>${pick(p.desc)}</p>
      ${list(p.points).length ? `<ul class="dash-list">${list(p.points).map((pt) => `<li>${pick(pt)}</li>`).join('')}</ul>` : ''}
      <div class="tags">${list(p.tags).map((tg) => `<span class="tag">${tg}</span>`).join('')}</div>
      ${p.link && p.link !== '#' ? `<a class="card-link" href="${p.link}" target="_blank" rel="noopener">${t('projects.view')}</a>` : ''}
    </div>`).join('');
}

function renderBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = list(BLOG_POSTS).map((b) => `
    <div class="card">
      ${b.image ? `<img class="card-image" src="${b.image}" alt="${pick(b.title) || 'Blog image'}" loading="lazy" />` : ''}
      <h3>${pick(b.title)}</h3>
      <p class="meta">${b.date}</p>
      <p>${pick(b.excerpt)}</p>
      <div class="tags">${list(b.tags).map((tg) => `<span class="tag">${tg}</span>`).join('')}</div>
      <a class="card-link" href="${b.url}">${t('blog.read')}</a>
    </div>`).join('');
}

function renderAll() {
  renderCerts();
  renderSkills();
  renderProjects();
  renderBlog();
}

// ---------- Subtle reveal on scroll ----------
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.dataset.theme = 'dark';
  applyLang();
  setupReveal();

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.addEventListener('click', () => setLang(lang === 'vi' ? 'en' : 'vi'));

  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
});
