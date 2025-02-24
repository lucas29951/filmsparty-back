const express = require("express");
const app = express();
const routes = require("../routes/index");


app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

module.exports = app;
