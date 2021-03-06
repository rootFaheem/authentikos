const users = [];
const quizResults = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    user => user.name === name && user.room == room
  );

  if (existingUser) {
    return { error: "username is already taken" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRomm = room => users.filter(user => user.room === room);

// QUIZ CALCULATIONS
const scoreUpdate = async (id, choice, name, rightChoice, question) => {
  if (rightChoice === choice) {
    const result = {
      id,
      question,
      name,
      choice
    };

    quizResults.push(result);
    // console.log("resut pushed:::", result);
  }
};

const getQuizResults = () => {
  return { quizResults };
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRomm,
  scoreUpdate,
  getQuizResults
};
