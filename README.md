# 🌐 PHÒNG THÍ NGHIỆM MÔ PHỎNG AN TOÀN MẠNG: HTTP VS HTTPS
### Dự Án Báo Cáo / Thực Hành - Nhóm 10

Ứng dụng web tương tác mô phỏng trực quan cơ chế hoạt động, sự khác biệt cốt lõi giữa **HTTP** (truyền bản rõ qua Port 80) và **HTTPS** (mã hóa đầu cuối TLS 1.3 qua Port 443), đồng thời minh họa tấn công trung gian **Man-in-the-Middle (MITM)**.

---

## 🚀 Các Tính Năng Nổi Bật

1. **Sơ Đồ Đường Truyền Gói Tin Động (Animated Network Pipeline)**:
   - Mô phỏng trực quan luồng gói tin di chuyển theo thời gian thực từ **Máy Khách (Client)** qua trạm trung chuyển **Wi-Fi / Router (Hacker)** tới **Máy Chủ (Server)**.
   - Gói tin hiển thị trạng thái tương ứng (Bản rõ / Giả mạo / Mã hóa an toàn TLS).

2. **Mô Phỏng 3 Kịch Bản Truyền Tải**:
   - **1. Không dùng giao thức (Raw Data / Socket thô)**: Dữ liệu bị kẻ gian bắt và dễ dàng tráo đổi nội dung (Packet Injection / Tampering).
   - **2. Giao thức HTTP (Cổng 80)**: Dữ liệu gửi đi dưới dạng Plaintext, bị kẻ nghe lén đọc trộm hoàn toàn mật khẩu và tài khoản.
   - **3. Giao thức HTTPS (Cổng 443 - TLS 1.3)**: Dữ liệu được mã hóa bằng thuật toán đối xứng (AES-256-GCM) với Session Key độc quyền. Hacker chỉ thấy Ciphertext vô nghĩa và không thể can thiệp.

3. **Giao Diện Hiện Đại & Trực Quan**:
   - Thiết kế chuẩn **Glassmorphism**, hiệu ứng đèn LED trạng thái, hiệu ứng ánh sáng động.
   - Terminal mô phỏng macOS/Linux với log chi tiết của Client, Wireshark Packet Sniffer và Nginx Server.
   - Các bộ dữ liệu mẫu (Đăng nhập ngân hàng, Thẻ tín dụng, Tin mật quân sự).
   - Bảng so sánh chuyên sâu về Cổng, Mã hóa, Tính toàn vẹn, Xác thực CA và Cảnh báo trình duyệt.
   - Hiệu ứng âm thanh mô phỏng (Web Audio API) với nút bật/tắt tiện lợi.

---

## 💻 Hướng Dẫn Chạy

Dự án được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript thuần**, không cần cài đặt thư viện ngoài (Zero Dependency):
- Nhấp đúp chuột vào file `index.html` để mở trực tiếp trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari).
- Hoặc chạy qua Live Server trên VS Code / trình duyệt web.

---

*Phát triển bởi Nhóm 10.*