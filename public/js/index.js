var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
})

socket.on('disconnect', () => {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

// socket.emit('createMessage', {
//     from: 'Client side user',
//     text: 'Client side user text'
//   },
//   function(data) {
//     console.log('Got it', data);
//   }
// )
