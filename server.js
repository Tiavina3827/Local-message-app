const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('join', username => {
        socket.username = username;
        io.emit('join', `${username} joined the chat`);
    });

    socket.on('message', message => {
        io.emit('message', `${socket.username}: ${message}`);
    });

    socket.on('disconnect', () => {
        io.emit('leave', `${socket.username} left the chat`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
