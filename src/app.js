// const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = require('./config/server');

// const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('./config/socket')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});