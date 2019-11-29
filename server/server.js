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
  io.emmit("chat message", function(msg) {
    console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(8079, () => console.log("server running at ", 8079));
