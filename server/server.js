const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(`${__dirname}/../public`);

app.use(express.static(publicPath))

const server = http.createServer(app);
// For loading the socketIO library
const io = socketIO(server);

// Listening to events
io.on('connection', (socket) => {
  console.log('New user has connected...');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
})

server.listen(port, () => {
  console.log(`Starting listening on port ${port}`);
})
