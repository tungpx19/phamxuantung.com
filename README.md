# phamxuantung.com — ESP32 BLK Transfer Notifier

Website tĩnh (HTML/CSS/JS) giới thiệu **Bộ DIY Loa Thông Báo Chuyển Khoản ESP32 BLK** và có demo giả lập webhook, giọng nói (Web Speech API).

## Cấu trúc
- `index.html` — nội dung trang
- `style.css` — giao diện tối, responsive
- `script.js` — demo nhân hoá (Loa BLK nói khi có chuyển khoản)
- `README.md` — hướng dẫn triển khai

## Triển khai nhanh (miễn phí)
### 1) GitHub Pages
1. Tạo repo `phamxuantung.com` (public).
2. Up 3 file `index.html`, `style.css`, `script.js` vào nhánh `main`.
3. Vào **Settings → Pages**: chọn `Deploy from a branch` → `main`/root.
4. Tự động có URL dạng `https://<username>.github.io/phamxuantung.com/`.
5. Trỏ domain riêng (xem mục **Tên miền**).

### 2) Netlify hoặc Vercel
- Kéo thả thư mục này lên Netlify, hoặc `vercel deploy` thư mục.
- Project tĩnh, không cần build step.

## Tên miền: www.phamxuantung.com
- Mua domain tại nhà đăng ký (tùy chọn).
- Trỏ **A record** tới IP của hosting (nếu dùng shared/VPS) **hoặc** dùng **CNAME** `www` → domain do Netlify/Vercel/GitHub cung cấp.
- Bật HTTPS (Let’s Encrypt tự động với Netlify/Vercel).

## Hosting
- **Miễn phí**: GitHub Pages / Netlify / Vercel cho site tĩnh.
- **Shared hosting** (cPanel): upload 3 file vào `public_html/`. Trỏ domain về nameserver của nhà cung cấp.
- **VPS**: cài Nginx → `root /var/www/phamxuantung.com;` → copy file vào thư mục, cấu hình chứng chỉ Let's Encrypt (Certbot).

## Giấy phép
MIT — tự do sử dụng & chỉnh sửa.

— Generated on 2025-08-28
