const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const PORT = process.env.PORT || 8079;
const app = express();
const server = http.createServer(app);

const io = socketio(server);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRomm
} = require("./app/users/users.utils");

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Welcome to the room ${user.room} `
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    callback();
  });

  socket.on("disconnect", () => {
    console.log("socket diconnected!!!");
  });
});

server.listen(PORT, () => {
  console.log(` 🚀  Server is running on port ${PORT}`);
});
