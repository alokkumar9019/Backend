const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;


let onlineUsers = {}; 
let messages = [];     


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);


  socket.on('register', ({ name }) => {
    if (!name) return socket.emit('errorMsg', 'Name is required');
    onlineUsers[socket.id] = { name };

    io.emit('onlineUsers', Object.values(onlineUsers));
    io.emit('userJoined', { name });


    socket.emit('chatHistory', messages);
  });

  socket.on('sendMessage', ({ text }) => {
    const user = onlineUsers[socket.id];
    if (!user) return socket.emit('errorMsg', 'Register first');

    const msg = {
      name: user.name,
      text,
      time: new Date(),
      isAdmin: user.name.toLowerCase() === 'admin'
    };
    messages.push(msg);

    io.emit('newMessage', msg);
  });


  socket.on('adminBroadcast', ({ text }) => {
    const user = onlineUsers[socket.id];
    if (!user || user.name.toLowerCase() !== 'admin') {
      return socket.emit('errorMsg', 'Only admin can broadcast');
    }

    const msg = { name: 'Admin', text, time: new Date(), isAdmin: true };
    messages.push(msg);
    io.emit('newMessage', msg);
  });

  socket.on('manualDisconnect', () => socket.disconnect(true));


  socket.on('disconnect', () => {
    const user = onlineUsers[socket.id];
    if (user) {
      delete onlineUsers[socket.id];
      io.emit('onlineUsers', Object.values(onlineUsers));
      io.emit('userLeft', { name: user.name });
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
