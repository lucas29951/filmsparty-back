const users = {};

const addUser = (socket, username) => {
    users[socket.id] = { username, id: socket.id };
};

const removeUser = (socket) => {
    delete users[socket.id];
};

const getUser = (socketId) => users[socketId];

module.exports = { addUser, removeUser, getUser };
