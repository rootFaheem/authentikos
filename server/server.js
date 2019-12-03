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
  // ADDING NEW USER AND SENDING WELCOME MESSAGE TO USER AND NOTIFICATION TO OTHERS
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

  // SENDING THE MESSAGE TO ROOM EMITTED FROM A USER
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("socket diconnected!!!");
  });
});

server.listen(PORT, () => {
  console.log(` 🚀  Server is running on port ${PORT}`);
});
