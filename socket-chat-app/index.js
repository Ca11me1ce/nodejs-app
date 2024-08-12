// Require Express package
const express = require('express');

// Create Express app
const app = express();

// Create Socket.IO server
const { Server } = require('socket.io');
const http = require('http');

// Apply Express app into the Socket.IO server
const server = http.createServer(app);

// Create Socket.IO instance and set the port
const io = new Server(server);
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('send name', (username) => {
        io.emit('send name', (username));
    });

    socket.on('send message', (chat) => {
        io.emit('send message', (chat));
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
