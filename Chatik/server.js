const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a new message is received, broadcast it to all users
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 2953
server.listen(2953, () => {
  console.log('Server running on http://localhost:2953');
});
