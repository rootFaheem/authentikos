const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowercase();
  room = room.trim().toLowercase();

  const existingUser = users.find(
    user => user.name === name && user.room == room
  );

  if (existingUser) {
    return { error: "username is already taken" };
  }

  const user = { id, name, user };
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

module.exports = { addUser, removeUser, getUser, getUsersInRomm };
