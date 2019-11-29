const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/template/landing.html");
});

app.get("/chat", (_, res) => {
  res.sendFile(__dirname + "/template/index.html");
});

const nsp = io.of("/quiz");

nsp.on("connection", socket => {
  console.log("someone connected to quiz");
  console.log("id:", socket.id);
  nsp.emit("play", " you are connected and ", "quiz will start soon");
});

nsp.on("say to someone", msg => {
  console.log("msg:", msg);

  nsp.broadcast.to(socket.id).emit("my message", msg);
});

io.on("connection", socket => {
  console.log("connected to landing page");

  socket.emit("hi", "before play lets try to connect to the quiz");
});

// io.on("connection", socket => {
//   console.log("\n ****************************");
//   console.log("new connection");
//   console.log("socket id:", socket.id);
//   console.log("socket connected:", socket.connected);

//   socket.broadcast.emit("chat message", "you are now connected");

//   socket.on("chat message", msg => {
//     io.emit("chat message", msg);
//     // socket.broadcast.emit("hi");
//     console.log(msg);
//   });

//   socket.on("disconnect", () => console.log("user disconnected"));
// });

http.listen(8079, () => console.log("server running at ", 8079));
