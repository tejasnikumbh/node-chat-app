const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(`${__dirname}/../public`);

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users = new Users();

const app = express();

app.use(express.static(publicPath))

const server = http.createServer(app);
// For loading the socketIO library
const io = socketIO(server);

// Listening to events
io.on('connection', (socket) => {
  console.log('New user has connected.');

  socket.on('join', (params, callback) => {
    // Validation
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    // Setup
    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    var userList = users.getUserList(params.room);

    // Emissions
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // Sends a message to all connected sockets except the one which triggered this emit
    socket.broadcast.to(params.room).emit('newMessage',
    generateMessage('Admin', `${params.name} has joined.`));
    // Emits updated user list to all users of the room
    io.to(params.room).emit('updateUserList', userList);

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    const user = users.getUser(socket.id);
    if(!user) { return }

    // Sends a message to all connected sockets of room

    socket.emit('newMessage', generateMessage(`${user.name} (You)`, message.text));
    socket.broadcast.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    // Calling the callback that the client passed, with data
    callback(message);
  });

  socket.on('createLocationMessage', (message) => {
    console.log('createLocationMessage', message);
    const user = users.getUser(socket.id);
    if(!user) { return }

    // Sends a message to all connected sockets of room
    socket.emit('newLocationMessage', generateLocationMessage(`${user.name} (You)`));
    socket.broadcast.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,
      message.latitude, message.longitude))
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
    console.log('User disconnected');
  });
})

server.listen(port, () => {
  console.log(`Starting listening on port ${port}`);
})
