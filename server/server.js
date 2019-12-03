const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cron = require("node-cron");

const PORT = process.env.PORT || 8079;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { quizQuestions } = require("./app/quiz/quizQuestions.json");

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
    console.log("new user has just joined");

    callback();
  });

  // SENDING THE MESSAGE TO ROOM EMITTED FROM A USER
  socket.on("sendMessage", async (message, callback) => {
    const user = await getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  //  QUIZ QUESTIONS

  cron.schedule("* * * * *", async () => {
    console.log("running a task every minute");
    let offset = 0;
    await quizQuestions.forEach(question => {
      setTimeout(() => {
        console.log("question::", question);
        socket.emit("quiz", question);
      }, 5000 + offset);
      offset += 5000;
    });

    setTimeout(() => {
      socket.emit("quizEnd", true);
    }, 20000);
  });

  socket.on("disconnect", () => {
    console.log("socket diconnected!!!");
  });
});

server.listen(PORT, () => {
  console.log(` 🚀  Server is running on port ${PORT}`);
});
