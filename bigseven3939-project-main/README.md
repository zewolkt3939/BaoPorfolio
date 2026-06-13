# 🛡️ Nguyễn Trường Bảo — Portfolio

Trang web portfolio cá nhân song ngữ (🇻🇳 / 🇬🇧) về An toàn thông tin, được deploy bằng **GitLab Pages**.

Bilingual personal cybersecurity portfolio website, deployed with **GitLab Pages**.

## ✨ Tính năng / Features

- 🌙 Dark mode mặc định + nút chuyển light mode
- 🌐 Song ngữ Việt/Anh (nút **VI/EN**, lưu lựa chọn trong localStorage)
- 💻 Hero kiểu terminal với hiệu ứng gõ chữ
- 📜 Các mục: Giới thiệu, Chứng chỉ, Kỹ năng, Dự án & CTF Write-ups, Blog, Liên hệ
- 🔐 Trang admin ẩn để thêm/sửa/xóa nội dung ngay trên web
- 📱 Responsive trên mobile

## 📁 Cấu trúc / Structure

```
public/
├── index.html              # Trang chính
├── admin.html              # 🔐 Trang quản trị nội dung (ẩn, không có link công khai)
├── css/style.css           # Giao diện (theme, responsive)
├── js/
│   ├── i18n.js             # Từ điển song ngữ cho nhãn UI
│   ├── data.js             # 📝 DỮ LIỆU: chứng chỉ, kỹ năng, dự án, blog
│   ├── admin.js            # Logic trang admin (commit qua GitLab API)
│   └── main.js             # Logic: đổi ngôn ngữ, theme, render
└── blog/
    └── sql-injection-basics.html  # Bài blog mẫu
```

## 🔐 Trang Admin

Truy cập `https://<pages-domain>/admin.html` (không có link công khai trên trang) để quản lý nội dung:

1. Tạo **Personal Access Token** với scope `api` trên GitLab: *User Settings → Access Tokens*.
2. Đăng nhập trang admin bằng token đó. Token chỉ lưu trong `sessionStorage` của trình duyệt, **không bao giờ** nằm trong mã nguồn.
3. Thêm / sửa / xóa chứng chỉ, kỹ năng, dự án, blog rồi bấm **🚀 Xuất bản thay đổi** — thay đổi được commit vào `public/js/data.js` trên nhánh `main` và GitLab Pages tự deploy lại.

> ⚠️ **Bảo mật**: token chính là "mật khẩu admin". Không chia sẻ token; ai có token là có quyền ghi vào repo. Nên đặt thời hạn ngắn cho token và thu hồi khi không dùng.

## ✏️ Cách chỉnh sửa nội dung thủ công / Manual editing

1. **Tên & giới thiệu**: sửa trong `public/index.html`.
2. **Chứng chỉ, kỹ năng, dự án, blog**: sửa các mảng trong `public/js/data.js` (hoặc dùng trang admin).
3. **Link liên hệ** (email, LinkedIn, GitHub): sửa phần `#contact` trong `public/index.html`.
4. **Thêm bài blog mới**: copy `public/blog/sql-injection-basics.html`, sửa nội dung, rồi thêm vào mảng `BLOG_POSTS` (qua trang admin hoặc sửa tay).

## 🚀 Deploy

### GitHub Pages

Repository này đã có workflow GitHub Actions tại:

```
.github/workflows/deploy-pages.yml
```

Workflow sẽ tự động deploy thư mục `bigseven3939-project-main/public/` lên GitHub Pages khi push vào nhánh `main`.

URL site sau khi bật Pages:

```
https://zewolkt3939.github.io/BaoPorfolio/
```

> 💡 Vào **Settings → Pages** và chọn **Build and deployment: GitHub Actions** (chỉ cần làm 1 lần).

### GitLab Pages (tuỳ chọn)

Nếu dùng GitLab, job `pages` trong `.gitlab-ci.yml` vẫn deploy thư mục `public/` như trước.

## 🧪 Chạy thử local / Run locally

```bash
cd public
python3 -m http.server 8000
# Mở http://localhost:8000
```
