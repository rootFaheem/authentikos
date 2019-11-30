const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const userList = [];
const messageList = [];

// app.get("/", (_, res) => {
//   res.sendFile(__dirname + "/template/landing.html");
// });

// app.get("/", (_, res) => {
//   res.sendFile(__dirname + "/template/index.html");
// });

io.on("connection", function(socket) {
  socket.on("login", name => {
    console.log("name insert: ", name);
    userList.push({ id: socket.id, name });
  });

  socket.on("send message", msg => {
    console.log("message::", msg);
    messageList.push(msg);
    socket.emit("send message", messageList);
  });

  io.emit("chat", userList);

  io.emit(
    "home",
    "Welcome to the Authentikos, you are connected to Scoket now"
  );

  socket.on("disconnect", () => {
    console.log("user disconnected with id = ", socket.id);
    userList.splice(userList.indexOf(socket.id), 1);
  });
});

http.listen(8079, () => console.log("server running at ", 8079));
