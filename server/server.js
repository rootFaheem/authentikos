const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/template/index.html");
});

io.on("connection", socket => {
  console.log("new connection");

  socket.on("chat message", msg => console.log(msg));

  socket.on("disconnect", () => console.log("user disconnected"));
});

http.listen(8079, () => console.log("server running at ", 8079));
