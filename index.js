const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });

    // socket.on('from_client', () => {
    //     console.log('received event from client');
    // })

    // setInterval(function f() {
    //     socket.emit('from_server');
    // }, 3000);

    socket.on('new_msg', (data) => {
        //group emit -> io.emit emits to all clients
        io.emit('msg_rcvd', data);
        //personal message -> socket.emit emits to only the cureent client sending req
        // socket.emit('msg_rcvd', data);
        //socket.broadcast.emit -> emits to everyone except current client
        // socket.broadcast.emit('msg_rcvd', data);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);

// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello world</h1>');
// // });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// server.listen(3000, () => {
//     console.log('listening on *:3000');
// });