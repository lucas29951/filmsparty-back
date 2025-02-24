const { createRoom, listRooms, joinRoom, leaveRoom, getUsersInRoom } = require("../controllers/roomController");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.on("createRoom", (roomName) => {
            createRoom(roomName);
            io.emit("roomList", listRooms());
        });

        socket.on("joinRoom", ({ username, room }) => {
            joinRoom(socket, username, room);
            io.to(room).emit("userList", getUsersInRoom(room));
        });

        socket.on("leaveRoom", () => {
            leaveRoom(socket);
            io.to(socket.room).emit("userList", getUsersInRoom(socket.room));
        });

        socket.on("disconnect", () => {
            leaveRoom(socket);
            io.to(socket.room).emit("userList", getUsersInRoom(socket.room));
            console.log(`Usuario desconectado: ${socket.id}`);
        });
    });
};
