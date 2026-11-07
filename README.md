# In-Memory Data Transfer & Deletion Module

Module này cung cấp giao diện và cơ chế xử lý luồng dữ liệu hoàn toàn trên bộ nhớ tạm (**RAM / In-Memory**), bao gồm hai tác vụ chính: **Truyền dữ liệu (Data Transfer)** và **Xóa dữ liệu (Data Deletion)**. 

Hệ thống được thiết kế theo kiến trúc **Zero-Database Persistence** — mọi thao tác đọc, ghi, chuyển tiếp và hủy dữ liệu đều diễn ra trực tiếp trên bộ nhớ khả biến (volatile memory) và không lưu trữ xuống bất kỳ hệ quản trị cơ sở dữ liệu vật lý (SQL/NoSQL) hay ổ cứng nào.

---

## Đặc điểm Kiến trúc (Architecture Highlights)

* **Lưu trữ trên RAM (In-Memory Storage):** Dữ liệu được khởi tạo và giữ trong các cấu trúc dữ liệu trên RAM (như `Array`, `Map`, `Object` ở phía Client/Server hoặc biến trạng thái `State`).
* **Không lưu Database (No-DB Persistence):** Loại bỏ hoàn toàn độ trễ I/O của ổ cứng và các truy vấn Database. Tăng tốc độ phản hồi lên mức tối đa và đảm bảo tính riêng tư tuyệt đối cho dữ liệu nhạy cảm/tạm thời.
* **Vòng đời dữ liệu ngắn (Ephemeral Lifecycle):** Dữ liệu chỉ tồn tại trong suốt phiên làm việc (Session) hoặc cho đến khi tiến trình (Process) kết thúc / trang web được tải lại (Reload).

---

## Cơ chế Hoạt động (Core Workflows)

### 1. Lưu trữ tạm thời (In-Memory Allocation)
Khi dữ liệu được nhập vào từ giao diện hoặc nhận qua luồng (stream), hệ thống cấp phát vùng nhớ trực tiếp trên Heap/RAM thông qua biến cục bộ hoặc Store quản lý trạng thái.

```text
[User Input / Payload] ──> [Memory Buffer / State (RAM)] (Không ghi xuống Disk/DB)