const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/template/index.html");
});

io.on("connection", socket => {
  console.log("new connection");

  socket.broadcast.emit("chat message", "you are now connected");

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
    // socket.broadcast.emit("hi");
    console.log(msg);
  });

  socket.on("disconnect", () => console.log("user disconnected"));
});

http.listen(8079, () => console.log("server running at ", 8079));
