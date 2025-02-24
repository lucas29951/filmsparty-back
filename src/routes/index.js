const express = require("express");
const { listRooms } = require("../controllers/roomController");
const router = express.Router();


router.get("/rooms", (req, res) => {
    res.json({ rooms: listRooms() });
});

module.exports = router;
