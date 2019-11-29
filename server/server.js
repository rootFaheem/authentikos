const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const userList = [];

// app.get("/", (_, res) => {
//   res.sendFile(__dirname + "/template/landing.html");
// });

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/template/index.html");
});

io.on("connection", function(socket) {
  console.log("new user connected");

  userList.push(socket.id);
  socket.on("send message", msg => {
    console.log("message::", msg);
    socket.emit("send message", msg);
  });

  io.emit("chat message", "hi there", userList);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userList.splice(userList.indexOf(socket.id), 1);
  });
});

http.listen(8079, () => console.log("server running at ", 8079));
