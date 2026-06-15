// =====================================================
// 🔐 Trang admin: quản lý nội dung (chứng chỉ, kỹ năng,
// dự án, blog) và xuất bản bằng cách commit file
// public/js/data.js qua GitLab API.
// Đăng nhập bằng GitLab Personal Access Token (scope: api).
// Token chỉ lưu trong sessionStorage — KHÔNG hardcode trong repo.
// =====================================================

const GL_API = 'https://gitlab.com/api/v4';
const PROJECT_ID = 83197201;
const BRANCH = 'main';
const DATA_FILE_PATH = 'public/js/data.js';
const TOKEN_KEY = 'gl_admin_token';

const clone = (o) => JSON.parse(JSON.stringify(o));

const state = {
  certificates: Array.isArray(CERTIFICATES) ? clone(CERTIFICATES) : [],
  skills: Array.isArray(SKILLS) ? clone(SKILLS) : [],
  projects: Array.isArray(PROJECTS) ? clone(PROJECTS) : [],
  blog: Array.isArray(BLOG_POSTS) ? clone(BLOG_POSTS) : [],
  dirty: false,
  section: 'certificates',
  editIndex: null
};

const SECTIONS = {
  certificates: {
    label: '📜 Chứng chỉ',
    fields: [
      { key: 'icon', label: 'Icon (emoji)' },
      { key: 'name', label: 'Tên chứng chỉ' },
      { key: 'issuer', label: 'Tổ chức cấp' },
      { key: 'date', label: 'Năm' },
      { key: 'link', label: 'Link credential' },
      { key: 'image', label: 'Ảnh (URL, tùy chọn)' }
    ],
    display: (it) => `${it.icon || ''} ${it.name || ''} — ${it.issuer || ''} (${it.date || ''})`
  },
  projects: {
    label: '🚀 Dự án & CTF',
    fields: [
      { key: 'title', label: 'Tiêu đề', bilingual: true },
      { key: 'desc', label: 'Mô tả', bilingual: true, textarea: true },
      { key: 'tags', label: 'Tags (phân cách bằng dấu phẩy)', list: true },
      { key: 'link', label: 'Link' },
      { key: 'image', label: 'Ảnh preview (URL, tùy chọn)' }
    ],
    display: (it) => (it.title && it.title.vi) || ''
  },
  blog: {
    label: '✍️ Blog',
    fields: [
      { key: 'title', label: 'Tiêu đề', bilingual: true },
      { key: 'date', label: 'Ngày (YYYY-MM-DD)' },
      { key: 'tags', label: 'Tags (phân cách bằng dấu phẩy)', list: true },
      { key: 'excerpt', label: 'Tóm tắt', bilingual: true, textarea: true },
      { key: 'url', label: 'URL bài viết (vd: blog/ten-bai.html)' },
      { key: 'image', label: 'Ảnh đại diện (URL, tùy chọn)' }
    ],
    display: (it) => `${(it.title && it.title.vi) || ''} (${it.date || ''})`
  },
  skills: {
    label: '🛠️ Kỹ năng',
    json: true
  }
};

// ---------- DOM helpers ----------
const $ = (s) => document.querySelector(s);
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstChild;
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Auth ----------
async function verifyToken(tk) {
  const res = await fetch(`${GL_API}/user`, { headers: { 'PRIVATE-TOKEN': tk } });
  if (!res.ok) throw new Error('Token không hợp lệ hoặc đã hết hạn.');
  return res.json();
}

async function login() {
  const tk = $('#tokenInput').value.trim();
  const err = $('#loginError');
  err.textContent = '';
  if (!tk) { err.textContent = 'Vui lòng nhập token.'; return; }
  try {
    const user = await verifyToken(tk);
    sessionStorage.setItem(TOKEN_KEY, tk);
    showPanel(user);
  } catch (e) {
    err.textContent = e.message;
  }
}

function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  location.reload();
}

function showPanel(user) {
  $('#loginView').hidden = true;
  $('#panelView').hidden = false;
  $('#adminUser').textContent = `@${user.username}`;
  renderTabs();
  renderSection();
}

// ---------- UI ----------
function renderTabs() {
  const tabs = $('#tabs');
  tabs.innerHTML = '';
  Object.entries(SECTIONS).forEach(([key, s]) => {
    const b = el(`<button class="tab ${key === state.section ? 'active' : ''}">${s.label}</button>`);
    b.onclick = () => { state.section = key; state.editIndex = null; renderTabs(); renderSection(); };
    tabs.appendChild(b);
  });
}

function renderSection() {
  const cfg = SECTIONS[state.section];
  const box = $('#sectionBody');
  box.innerHTML = '';
  if (cfg.json) { renderJsonEditor(box); return; }

  const items = state[state.section];
  const list = el('<div class="admin-list"></div>');
  items.forEach((it, i) => {
    const row = el(`<div class="admin-row"><span>${esc(cfg.display(it))}</span><span class="row-actions"></span></div>`);
    const actions = row.querySelector('.row-actions');
    const edit = el('<button class="btn-mini">✏️ Sửa</button>');
    edit.onclick = () => { state.editIndex = i; renderSection(); };
    const del = el('<button class="btn-mini danger">🗑️ Xóa</button>');
    del.onclick = () => {
      if (confirm('Xóa mục này?')) { items.splice(i, 1); markDirty(); state.editIndex = null; renderSection(); }
    };
    actions.append(edit, del);
    list.appendChild(row);
  });
  box.appendChild(list);

  const addBtn = el('<button class="btn btn-outline">＋ Thêm mới</button>');
  addBtn.onclick = () => { state.editIndex = -1; renderSection(); };
  box.appendChild(addBtn);

  if (state.editIndex !== null) box.appendChild(buildForm(cfg, items));
}

function buildForm(cfg, items) {
  const isNew = state.editIndex === -1;
  const item = isNew ? {} : items[state.editIndex];
  const form = el(`<form class="admin-form"><h3>${isNew ? '＋ Thêm mới' : '✏️ Chỉnh sửa'}</h3></form>`);
  const inputs = {};

  cfg.fields.forEach((f) => {
    if (f.bilingual) {
      ['vi', 'en'].forEach((lng) => {
        const val = item[f.key] ? item[f.key][lng] || '' : '';
        const inp = f.textarea ? el('<textarea rows="2"></textarea>') : el('<input type="text" />');
        inp.value = val;
        inputs[`${f.key}.${lng}`] = inp;
        form.appendChild(el(`<label>${esc(f.label)} (${lng.toUpperCase()})</label>`));
        form.appendChild(inp);
      });
    } else {
      let val = item[f.key] ?? '';
      if (f.list) val = Array.isArray(val) ? val.join(', ') : val;
      const inp = f.textarea ? el('<textarea rows="2"></textarea>') : el('<input type="text" />');
      inp.value = val;
      inputs[f.key] = inp;
      form.appendChild(el(`<label>${esc(f.label)}</label>`));
      form.appendChild(inp);
    }
  });

  const save = el('<button type="submit" class="btn btn-primary">💾 Lưu mục</button>');
  const cancel = el('<button type="button" class="btn btn-outline">Hủy</button>');
  cancel.onclick = () => { state.editIndex = null; renderSection(); };
  const bar = el('<div class="form-actions"></div>');
  bar.append(save, cancel);
  form.appendChild(bar);

  form.onsubmit = (e) => {
    e.preventDefault();
    const out = isNew ? {} : item;
    cfg.fields.forEach((f) => {
      if (f.bilingual) {
        out[f.key] = { vi: inputs[`${f.key}.vi`].value.trim(), en: inputs[`${f.key}.en`].value.trim() };
      } else if (f.list) {
        out[f.key] = inputs[f.key].value.split(',').map((s) => s.trim()).filter(Boolean);
      } else {
        out[f.key] = inputs[f.key].value.trim();
      }
    });
    if (isNew) items.push(out);
    markDirty();
    state.editIndex = null;
    renderSection();
  };
  return form;
}

function renderJsonEditor(box) {
  box.appendChild(el('<p class="hint">Chỉnh trực tiếp JSON cho phần kỹ năng: mỗi nhóm có <code>group</code> (song ngữ vi/en) và <code>items</code>.</p>'));
  const ta = el('<textarea class="json-editor" rows="18"></textarea>');
  ta.value = JSON.stringify(state.skills, null, 2);
  box.appendChild(ta);
  const apply = el('<button class="btn btn-primary">Áp dụng JSON</button>');
  apply.onclick = () => {
    try {
      state.skills = JSON.parse(ta.value);
      markDirty();
      alert('Đã áp dụng. Nhớ bấm "Xuất bản thay đổi" để commit.');
    } catch (e) {
      alert('JSON không hợp lệ: ' + e.message);
    }
  };
  box.appendChild(apply);
}

// ---------- Publish ----------
function markDirty() {
  state.dirty = true;
  $('#publishBtn').disabled = false;
  $('#dirtyNote').hidden = false;
}

function buildDataJs() {
  const j = (v) => JSON.stringify(v, null, 2);
  return [
    '// =====================================================',
    '// 📝 DỮ LIỆU PORTFOLIO — file này được cập nhật từ trang admin',
    '// (public/admin.html). Vẫn có thể sửa tay nếu muốn.',
    '// =====================================================',
    '',
    `const CERTIFICATES = ${j(state.certificates)};`,
    '',
    `const SKILLS = ${j(state.skills)};`,
    '',
    `const PROJECTS = ${j(state.projects)};`,
    '',
    `const BLOG_POSTS = ${j(state.blog)};`,
    ''
  ].join('\n');
}

async function publish() {
  const btn = $('#publishBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Đang xuất bản…';
  try {
    const res = await fetch(`${GL_API}/projects/${PROJECT_ID}/repository/commits`, {
      method: 'POST',
      headers: { 'PRIVATE-TOKEN': sessionStorage.getItem(TOKEN_KEY), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        branch: BRANCH,
        commit_message: 'admin: cập nhật nội dung portfolio',
        actions: [{ action: 'update', file_path: DATA_FILE_PATH, content: buildDataJs() }]
      })
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.message || `HTTP ${res.status}`);
    }
    state.dirty = false;
    $('#dirtyNote').hidden = true;
    btn.textContent = '✅ Đã xuất bản';
    setTimeout(() => { btn.textContent = '🚀 Xuất bản thay đổi'; }, 3000);
    alert('Đã commit lên nhánh main. GitLab Pages sẽ tự deploy lại trong ít phút.');
  } catch (e) {
    alert('Lỗi xuất bản: ' + e.message);
    btn.disabled = false;
    btn.textContent = '🚀 Xuất bản thay đổi';
  }
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', async () => {
  $('#loginBtn').onclick = login;
  $('#tokenInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });
  $('#logoutBtn').onclick = logout;
  $('#publishBtn').onclick = publish;

  const saved = sessionStorage.getItem(TOKEN_KEY);
  if (saved) {
    try {
      showPanel(await verifyToken(saved));
    } catch {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }
});
