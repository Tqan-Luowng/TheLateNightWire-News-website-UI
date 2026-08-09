# ✦ The Late Wire — Night Desk Edition

> *"Bản tin ban đêm — phát hành tự động."*

Một tờ báo đêm giả lập theo phong cách editorial, xây dựng bằng **React 18 + Vite**. Giao diện lấy cảm hứng từ thiết kế báo in cổ điển kết hợp dark-mode hiện đại — dành cho những ai còn thức lúc 3 giờ sáng.

---

## ✨ Tính năng

### 📰 Đọc tin
- **Hero / Lead Story** — Bài nổi bật chiếm toàn màn hình phần trên
- **Rail Articles** — Hàng tin phụ cạnh hero (Công nghệ, Thị trường, Sức khoẻ...)
- **Wire Desk Grid** — Lưới bài viết theo chuyên mục: Khoa học, Đô thị, Giáo dục, Thể thao...
- **Văn hoá & Đời sống** — Section tản văn và phê bình đọc cuối ca trực
- **Breaking News Ticker** — Thanh tin nóng chạy tự động
- **Market Ticker** — Bảng chỉ số thị trường tài chính giả lập
- **Article Modal** — Đọc bài đầy đủ trong overlay, không rời trang

### 🔍 Tìm kiếm
- Tìm kiếm realtime theo tiêu đề, mô tả và chuyên mục
- Tìm kiếm trong navbar (desktop) và menu ngăn kéo (mobile)

### 👤 Hệ thống tài khoản
- **Đăng ký / Đăng nhập** — Lưu trữ qua `localStorage`
- **Hồ sơ phóng viên** — Hiển thị avatar, thông tin cá nhân có thể chỉnh sửa
- **Thẻ nhà báo** — Badge cá nhân theo phong cách press credential
- **Lưu bài (Bookmark)** — Lưu bài yêu thích, xem lại trong hồ sơ

### ✍️ Viết & Đăng bài
- **Publish Modal** — Form viết bài mới (yêu cầu đăng nhập)
- Bài đăng xuất hiện ngay đầu feed và lưu trong trang hồ sơ cá nhân

### 🎨 UI/UX
- **Masthead** — Header cố định với đồng hồ thời gian thực (HH:MM:SS)
- **Toast Notifications** — Thông báo nhẹ nhàng cho các hành động
- **Grain overlay** — Hiệu ứng hạt phim analog trên toàn trang
- **Responsive** — Hỗ trợ mobile với hamburger menu và ngăn kéo điều hướng
- **Relative time** — Thời gian bài viết tự động cập nhật mỗi phút

---

## 🛠️ Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Styling | Vanilla CSS (Custom Properties) |
| Fonts | Fraunces · IBM Plex Sans · IBM Plex Mono |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| State | `useState` + `localStorage` |
| Routing | Thủ công qua `activePage` state |

---

## 🚀 Bắt đầu

### Yêu cầu
- **Node.js** ≥ 18
- **npm** ≥ 9

### Cài đặt

```bash
# Clone về máy
git clone https://github.com/<your-username>/TheLateNightWire.git
cd TheLateNightWire

# Cài dependencies
npm install

# Chạy development server
npm run dev
```

Mở trình duyệt tại **http://localhost:5173**

### Các lệnh khác

```bash
npm run build    # Build production (output: dist/)
npm run preview  # Preview bản build production
```

---

## 📁 Cấu trúc Project

```
TheLateNightWire/
├── index.html              # HTML entry point (lang="vi")
├── vite.config.js          # Vite configuration
├── .oxlintrc.json          # Oxlint rules
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Root component — routing, state, layout
    ├── App.css             # App-level styles
    ├── index.css           # Design system (CSS variables, utilities)
    ├── components/
    │   ├── Masthead.jsx    # Header cố định + đồng hồ thời gian thực
    │   ├── Navbar.jsx      # Thanh điều hướng + search + publish button
    │   ├── Ticker.jsx      # Breaking news ticker chạy ngang
    │   ├── Markets.jsx     # Bảng chỉ số thị trường
    │   ├── ArticleModal.jsx # Modal đọc bài đầy đủ
    │   ├── PublishModal.jsx # Modal viết & đăng bài mới
    │   └── Toast.jsx       # Thông báo toast
    ├── pages/
    │   ├── Home.jsx        # Trang chủ: hero, rail, desk grid, culture
    │   ├── Login.jsx       # Trang đăng nhập
    │   ├── Register.jsx    # Trang đăng ký tài khoản
    │   └── Profile.jsx     # Trang hồ sơ phóng viên
    └── data/
        └── mockArticles.js # Dữ liệu bài viết mẫu (13 bài)
```

---

## 📦 Dữ liệu & State

Toàn bộ dữ liệu được lưu tại **client-side** — không có backend hay API:

| Key (`localStorage`) | Nội dung |
|----------------------|----------|
| `wire_current_user` | Thông tin user đang đăng nhập |
| `wire_registered_users` | Danh sách tất cả tài khoản đã đăng ký |
| `wire_bookmarks` | Danh sách ID bài đã bookmark |

Bài viết được khởi tạo từ `src/data/mockArticles.js` và lưu trong React state trong suốt phiên làm việc. Bài viết người dùng đăng sẽ mất khi reload trang (do chưa có persistence).

---

## 🎨 Design System

Project sử dụng CSS Custom Properties làm design tokens:

```css
/* Màu chủ đạo */
--ink        /* Nền tối chính */
--paper      /* Nền card */
--brass      /* Màu nhấn (vàng đồng) */
--fog        /* Text phụ */
--urgent     /* Màu "Tin nóng" */

/* Typography */
--font-serif  /* Fraunces — tiêu đề */
--font-sans   /* IBM Plex Sans — body */
--font-mono   /* IBM Plex Mono — metadata, stamps */
```

---

## 🗺️ Roadmap ý tưởng

- [ ] Lưu bài viết người dùng vào `localStorage`
- [ ] Phân trang / infinite scroll cho Wire Desk
- [ ] Filter bài theo chuyên mục (tab)
- [ ] Dark / Light mode toggle
- [ ] Backend thực (Supabase / Firebase) để lưu bài và tài khoản
- [ ] Tìm kiếm toàn văn (full-text search)

---

## 📄 Giấy phép

Dự án này được phát triển cho mục đích **học tập và thử nghiệm**. Không dùng cho mục đích đưa tin thật.

---

<p align="center">
  <em>✦ The Late Wire · Night Desk Edition · Bản in thử nghiệm · Ấn bản Bàn Đêm</em>
</p>