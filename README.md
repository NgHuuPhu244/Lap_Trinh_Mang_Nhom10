# 👻 GhostDrop - Hệ thống Truyền & Tự Hủy Dữ Liệu Trên RAM (Nhóm 10)

## 1. Giới thiệu đề tài
- *Môn học:* Lập trình mạng (GV: Vũ Quốc Hưng)
- *Giao thức sử dụng:* WebSocket (ws:// - RFC 6455) kết hợp lưu trữ khả biến trên RAM (In-Memory Storage).
- *Cơ chế bảo mật:* 
  - Giao diện ngụy trang thành ứng dụng Máy tính bỏ túi (nhập mã 1337 và nhấn = để mở khóa vào phiên ẩn).
  - Toàn bộ tin nhắn và file chỉ lưu trên bộ nhớ Map() trong RAM của Server, tuyệt đối không ghi xuống ổ cứng hay Database.
  - Khi nhấn nút *XÓA SẠCH RAM*, vùng nhớ lập tức bị giải phóng và đồng bộ xóa trắng trên mọi thiết bị theo thời gian thực.

## 2. Hướng dẫn cài đặt và chạy
```bash
npm install
node server.js