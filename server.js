"use strict";

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', (req, res) => {
  res.sendFile(__dirname + '/client.js');
});


io.on('connection', socket => {
  console.info('New user connected!');
  socket.on('client_to_server', data => {
    console.info('Message received: ' + data.value);
    io.sockets.emit('server_to_client', {value : data.value});
  });
});

http.listen(8080, () => {
  console.info('http://localhost:8080');
});

