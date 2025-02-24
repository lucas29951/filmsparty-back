const rooms = {};

const createRoom = (roomName) => {
    if (!rooms[roomName]) {
        rooms[roomName] = [];
    }
};

const listRooms = () => Object.keys(rooms);

const joinRoom = (socket, username, room) => {
    if (!rooms[room]) {
        createRoom(room);
    }
    socket.join(room);
    rooms[room].push({ id: socket.id, username });
    socket.room = room;
    socket.username = username;
};

const leaveRoom = (socket) => {
    const room = socket.room;
    if (room && rooms[room]) {
        rooms[room] = rooms[room].filter(user => user.id !== socket.id);
        if (rooms[room].length === 0) delete rooms[room];
    }
};

const getUsersInRoom = (room) => {
    return rooms[room] || [];
};

module.exports = { createRoom, listRooms, joinRoom, leaveRoom, getUsersInRoom };
