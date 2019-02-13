const express = require("express");
const knex = require("../data/dbConfig");
const middleware = require("./middleware/config");
const studentRouter = require("./routes/studentsRoutes.js");
const scoreRouter = require("./routes/scoresRoutes.js");
const server = express();

//middleware
middleware(server);

//routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "server up" });
});
server.use("/students", studentRouter);
server.use("/scores", scoreRouter);

module.exports = server;
