const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const PORT = process.env.PORT || 8079;

const app = express();
const server = http.createServer(app);

const io = socketio(server);

io.on("connection", socket => {
  console.log("new connection!!!", socket);

  socket.on("disconnect", () => {
    console.log("socket diconnected!!!", socket);
  });
});

server.listen(PORT, () => {
  console.log(` 🚀  Server is running on port ${PORT}`);
});
