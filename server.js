const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    maxHttpBufferSize: 5e7
});

app.use(express.static(__dirname));

const ramStorage = new Map();

io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
        socket.rooms.forEach(r => { if (r !== socket.id) socket.leave(r); });
        socket.join(room);
        
        const currentData = ramStorage.get(room) || [];
        socket.emit('sync-ram', currentData);

        io.emit('protocol-event', {
            action: 'HANDSHAKE',
            room: room,
            detail: 'Client [' + socket.id.slice(0,5) + '] nâng cấp kết nối sang ws:// (Phiên: ' + room + ')',
            ramCount: currentData.length
        });
    });

    socket.on('push-to-ram', ({ room, text, fileName, fileData }) => {
        if (!ramStorage.has(room)) ramStorage.set(room, []);

        const newItem = {
            id: Date.now().toString(),
            sender: socket.id.slice(0, 5),
            text: text || '',
            fileName: fileName || null,
            fileData: fileData || null,
            time: new Date().toLocaleTimeString('vi-VN')
        };

        ramStorage.get(room).push(newItem);
        const updatedList = ramStorage.get(room);

        io.to(room).emit('sync-ram', updatedList);

        io.emit('protocol-event', {
            action: 'FRAME_PUSH',
            room: room,
            detail: 'Truyền WebSocket Frame (' + (fileName ? 'File: ' + fileName : 'Text') + ') -> Ghi vào RAM',
            ramCount: updatedList.length
        });
    });

    socket.on('nuke-ram', (room) => {
        if (ramStorage.has(room)) {
            ramStorage.set(room, []);
            ramStorage.delete(room);
        }

        io.to(room).emit('sync-ram', []);

        io.emit('protocol-event', {
            action: 'RAM_NUKE',
            room: room,
            detail: 'Lệnh hủy khẩn cấp! Đã giải phóng hoàn toàn vùng nhớ RAM của phiên "' + room + '"',
            ramCount: 0
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('GhostDrop (Bai 3): http://localhost:' + PORT + '/index.html');
    console.log('Minh hoa Giao thuc (Bai 2): http://localhost:' + PORT + '/visualizer.html');
});