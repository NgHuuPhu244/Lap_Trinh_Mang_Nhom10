const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Tăng giới hạn dung lượng để nhận được cả text dài hoặc file ảnh/tài liệu (Base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// =========================================================
// BỘ NHỚ RAM: Dữ liệu chỉ sống ở đây, KHÔNG dùng Database
// Cấu trúc: Map<roomCode, Array<{ id, text, fileName, fileData, time }>>
// =========================================================
const ramStorage = new Map();

// 1. API lấy dữ liệu từ RAM theo Mã Phòng (Session)
app.get('/api/data/:room', (req, res) => {
    const room = req.params.room;
    const data = ramStorage.get(room) || [];
    res.json({ success: true, data });
});

// 2. API truyền dữ liệu mới lên RAM
app.post('/api/data/:room', (req, res) => {
    const room = req.params.room;
    const { text, fileName, fileData } = req.body;

    if (!ramStorage.has(room)) {
        ramStorage.set(room, []);
    }

    const newItem = {
        id: Date.now().toString(),
        text: text || '',
        fileName: fileName || null,
        fileData: fileData || null, // Lưu chuỗi Base64 của file ngay trên RAM
        time: new Date().toLocaleTimeString('vi-VN')
    };

    ramStorage.get(room).push(newItem);
    res.json({ success: true, item: newItem });
});

// 3. API XÓA SẠCH DỮ LIỆU KHỎI RAM (Burn / Nuke)
app.delete('/api/data/:room', (req, res) => {
    const room = req.params.room;
    
    if (ramStorage.has(room)) {
        // Ghi đè mảng rỗng rồi xóa hẳn key khỏi Map để Garbage Collector dọn khỏi RAM
        ramStorage.set(room, []);
        ramStorage.delete(room);
    }
    
    res.json({ success: true, message: 'Đã xóa sạch dữ liệu khỏi RAM!' });
});

app.listen(PORT, () => {
    console.log([GhostDrop] Server đang chạy tại: http://localhost:${PORT});
    console.log([Lưu ý] Mọi dữ liệu chỉ lưu trên RAM. Tắt server là mất hết!);
});