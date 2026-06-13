// =====================================================
// Logic chính: đổi ngôn ngữ, render dữ liệu từ js/data.js,
// hiệu ứng fade-in nhẹ khi cuộn. Dark mode only.
// =====================================================

// ---------- i18n ----------
let lang = localStorage.getItem('lang') || 'vi';

function t(key) {
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), I18N[lang]);
}

function applyLang() {
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-en', lang === 'en');
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
const pick = (v) => (typeof v === 'object' ? v[lang] : v);

function renderCerts() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;
  grid.innerHTML = CERTIFICATES.map((c) => `
    <div class="card">
      <span class="icon">${c.icon}</span>
      <h3>${c.name}</h3>
      <p class="meta">${c.issuer} · ${c.date}</p>
      <a class="card-link" href="${c.link}" target="_blank" rel="noopener">${t('certs.view')}</a>
    </div>`).join('');
}

function renderSkills() {
  const grid = document.getElementById('skillGrid');
  if (!grid) return;
  grid.innerHTML = SKILLS.map((g) => `
    <div class="card">
      <h3>${pick(g.group)}</h3>
      <div class="chips">${g.items.map((s) => `<span class="chip">${typeof s === 'object' ? s.name : s}</span>`).join('')}</div>
    </div>`).join('');
}

function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p) => `
    <div class="card">
      <h3>${pick(p.title)}</h3>
      <p>${pick(p.desc)}</p>
      ${p.points ? `<ul class="dash-list">${p.points.map((pt) => `<li>${pick(pt)}</li>`).join('')}</ul>` : ''}
      <div class="tags">${p.tags.map((tg) => `<span class="tag">${tg}</span>`).join('')}</div>
      ${p.link && p.link !== '#' ? `<a class="card-link" href="${p.link}" target="_blank" rel="noopener">${t('projects.view')}</a>` : ''}
    </div>`).join('');
}

function renderBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = BLOG_POSTS.map((b) => `
    <div class="card">
      <h3>${pick(b.title)}</h3>
      <p class="meta">${b.date}</p>
      <p>${pick(b.excerpt)}</p>
      <div class="tags">${b.tags.map((tg) => `<span class="tag">${tg}</span>`).join('')}</div>
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
