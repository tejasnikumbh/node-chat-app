const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(`${__dirname}/../public`);

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const app = express();

app.use(express.static(publicPath))

const server = http.createServer(app);
// For loading the socketIO library
const io = socketIO(server);

// Listening to events
io.on('connection', (socket) => {
  console.log('New user has connected.');



  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // Sends a message to all connected sockets except the one which triggered this emit
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', 'New user has joined'));


    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    // Sends a message to all connected sockets
    io.emit('newMessage', generateMessage(message.from, message.text));
    // Calling the callback that the client passed, with data
    callback(message);
  });

  socket.on('createLocationMessage', (message) => {
    console.log('createLocationMessage', message);
    io.emit('newLocationMessage', generateLocationMessage('Admin',
      message.latitude, message.longitude))
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})

server.listen(port, () => {
  console.log(`Starting listening on port ${port}`);
})
