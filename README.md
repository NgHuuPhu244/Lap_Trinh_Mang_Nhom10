# WebChat — phòng chat thời gian thực

Ứng dụng chat nhóm chạy real-time, viết bằng Node.js + WebSocket. Chỉ dùng một
thư viện (`ws`), không cần database, không cần build.

## Chạy thử

```bash
npm install
npm start
```

Mở `http://localhost:3000`, nhập tên hiển thị và tên phòng rồi bấm
**Enter chat**. Muốn xem chat thật thì mở hai cửa sổ trình duyệt, vào cùng một
phòng.

```bash
npm test        # tự khởi động server riêng rồi chạy bộ test
npm run dev     # tự khởi động lại khi sửa code
```

## Tính năng

- Nhiều phòng, tạo và chuyển phòng trực tiếp
- Hiện danh sách người online, báo khi có người vào/ra
- Báo "đang gõ..."
- Vào phòng được xem lại 50 tin gần nhất
- Tự kết nối lại khi rớt mạng
- Giới hạn spam (8 tin / 3 giây) và độ dài tin nhắn
- Giao diện dùng được trên điện thoại

## Thư mục

```
server.js        server HTTP + WebSocket
docs/            giao diện web (html, css, js)
test/smoke.mjs   bộ test
Dockerfile       build image
```

## Cấu hình

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `PORT` | `3000` | Cổng HTTP và WebSocket |
| `HOST` | `0.0.0.0` | Địa chỉ nghe |

Các giới hạn (độ dài tin, số tin lịch sử, chống spam) nằm trong `LIMITS` ở đầu
[server.js](server.js).

## Đưa lên mạng

**Render / Railway / Fly.io** — trỏ dịch vụ về repo này, lệnh khởi động là
`npm start`, cổng lấy từ biến `PORT`. WebSockets chạy ngay, không cần cấu hình
thêm.

**Docker**

```bash
docker build -t webchat .
docker run -p 3000:3000 webchat
```

## Còn GitHub Pages thì sao?

Pages chỉ phục vụ file tĩnh, **không chạy được `server.js`**. Đưa mỗi Pages lên
thì trang hiện ra nhưng chat không nối được — vẫn phải có nơi chạy server.

Nếu muốn tách giao diện sang Pages:

1. Deploy server ở nơi khác rồi lấy URL của nó.
2. **Settings → Pages → Source: Deploy from a branch**, chọn `main` và thư mục
   **`/docs`**.
3. Mở trang một lần kèm hậu tố: `/?server=https://ten-ung-dung.onrender.com`

Trình duyệt sẽ nhớ URL này và hiện tên server ở đầu trang để bạn biết tin nhắn
đang đi đâu. Muốn quay lại chế độ cũ, mở `/?server=` (không nhập gì phía sau).

## Giới hạn

Toàn bộ dữ liệu nằm trong RAM: khởi động lại là mất lịch sử, chạy nhiều
instance cùng lúc cần sticky session. Không có tài khoản, mật khẩu hay kiểm
duyệt nội dung — ai mở được URL đều chat được. Hợp làm demo hoặc dùng nội bộ,
chưa phải sản phẩm hoàn chỉnh.

## Bản quyền

MIT — xem [LICENSE](LICENSE).
