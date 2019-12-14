const socketHandler = () => {
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

    // RESET PREVIOUS QUIZ
    socket.emit("quizEnd", false);

    let offset = 0;
    await quizQuestions.forEach(question => {
      setTimeout(() => {
        socket.emit("quiz", question);

        socket.on("playQuiz", async ({ choice, name }, callback) => {
          // console.log("users  choice:", choice);
          // console.log("users  question.rightAnswer:", question.rightAnswer);

          await scoreUpdate(
            socket.id,
            choice,
            name,
            question.rightAnswer,
            question.question
          );
          callback();
        });
      }, 10000 + offset);
      offset += 5000;
    });

    setTimeout(async () => {
      socket.emit("quizEnd", true);

      const quizResult = await getQuizResults();
      const allUserResults = quizResult.quizResults;

      let userIds = [];

      await allUserResults.map(item => {
        userIds.push(item.id);
      });

      const uniqueUsers = [...new Set(userIds)];

      // console.log("uniqueUsers::", uniqueUsers);

      uniqueUsers.map(socketId => {
        let score = 0;
        // console.log("socketId:", socketId);

        for (i = 0; i < allUserResults.length; i++) {
          // console.log("socketId:", socketId);
          // console.log("allUserResults[i]:", allUserResults[i]);

          if (socketId === allUserResults[i].id) {
            quizQuestions.map(item => {
              if (
                item.question === allUserResults[i].question &&
                allUserResults[i].choice === item.rightAnswer
              ) {
                score += 1;
              }
            });
          }
        }

        console.log("score:", score);
        io.to(socketId).emit("myresult", score);
      });

      // console.log("getQuizResults:::::::", quizResult);
      socket.emit("getresult", allUserResults);
    }, 70000);
  });

  socket.on("disconnect", () => {
    console.log("socket diconnected!!!");
  });
};

module.exports = socketHandler;
