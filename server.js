const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve frontend from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('✅ A user connected');

  socket.on('send-changes', (data) => {
    socket.broadcast.emit('receive-changes', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected');
  });
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
