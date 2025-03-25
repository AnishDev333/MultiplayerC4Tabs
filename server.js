const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (index.html, game.js, style.css, etc.) from the project root
app.use(express.static('public'));

// Listen for connections
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  // When a player joins a room
  socket.on('joinRoom', (data) => {
    const room = data.room;
    socket.join(room);
    socket.room = room;  // Store room on the socket for future reference
    console.log(`Player ${socket.id} joined room ${room}`);
    // Inform other players in the room that a new player has joined
    io.to(room).emit('playerJoined', { playerId: socket.id });
  });

  // Listen for color selection, confined to the room
  socket.on('colorSelected', (data) => {
    const room = socket.room;
    if (room) {
      console.log(`Player ${socket.id} in room ${room} selected color ${data.color}`);
      // Use socket.to(room) so that the sender doesn't receive their own event
      socket.to(room).emit('colorSelected', { playerId: socket.id, color: data.color });
    }
  });

  // Listen for moves
  socket.on('move', (data) => {
    const room = socket.room;
    if (room) {
      console.log(`Player ${socket.id} in room ${room} made a move in col ${data.col}, row ${data.row}`);
      socket.to(room).emit('move', data);
    }
  });

  // Listen for game over events
  socket.on('gameOver', (data) => {
    const room = socket.room;
    if (room) {
      console.log(`Player ${socket.id} in room ${room} game over: ${data.message}`);
      socket.to(room).emit('gameOver', data);
    }
  });

  // On disconnect, inform others in the room
  socket.on('disconnect', () => {
    console.log('A player disconnected:', socket.id);
    if (socket.room) {
      socket.to(socket.room).emit('playerDisconnected', { playerId: socket.id });
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
