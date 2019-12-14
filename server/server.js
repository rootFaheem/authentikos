const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cron = require("node-cron");

const PORT = process.env.PORT || 8079;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { quizQuestions } = require("./app/quiz/quizQuestions.json");

const socialAuthRoutes = require("./app/auth/social/socialAuth.routes");
const scoektHandler = require("./app/socket/socket");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRomm,

  scoreUpdate,
  getQuizResults
} = require("./app/users/users.utils");

io.on("connection", socket => {
  scoektHandler();
});

app.use("/auth/google", socialAuthRoutes);

server.listen(PORT, () => {
  console.log(` 🚀  Server is running on port ${PORT}`);
});
