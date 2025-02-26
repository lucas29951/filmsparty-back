const express = require("express");
const { createRoom, listRooms, joinRoom, leaveRoom, getUsersInRoom } = require("../controllers/roomController");
const { addUser, removeUser, getUser } = require("../controllers/userController");
const router = express.Router();


router.get("/rooms", (req, res) => {
    res.json({ rooms: listRooms() });
});


router.post("/rooms", (req, res) => {
    const { room } = req.body;
    if (!room) {
        return res.status(400).json({ error: "El nombre de la sala es obligatorio" });
    }
    createRoom(room);
    res.json({ message: `Sala '${room}' creada` });
});


router.get("/rooms/:room/users", (req, res) => {
    const { room } = req.params;
    const users = getUsersInRoom(room).map(user => user.username);
    res.json({ room, users });
});


router.post("/rooms/:room/join", (req, res) => {
    const { room } = req.params;
    const { username } = req.body;
    
    if (!username) {
        return res.status(400).json({ error: "El nombre de usuario es obligatorio" });
    }

    // Simulamos un socket para la prueba en Postman
    const fakeSocket = { id: Date.now().toString(), join: () => {} };
    joinRoom(fakeSocket, username, room);
    addUser(fakeSocket, username);

    res.json({ message: `${username} se unió a la sala '${room}'`, users: getUsersInRoom(room) });
});


router.post("/rooms/:room/leave", (req, res) => {
    const { room } = req.params;
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "El nombre de usuario es obligatorio" });
    }

    // Buscar usuario por nombre y simular un socket
    const userSocket = Object.values(getUsersInRoom(room)).find(user => user.username === username);

    if (!userSocket) {
        return res.status(404).json({ error: "Usuario no encontrado en la sala" });
    }

    leaveRoom(userSocket, room);
    removeUser(userSocket);

    res.json({ message: `${username} salió de la sala '${room}'`, users: getUsersInRoom(room) });
});

module.exports = router;
