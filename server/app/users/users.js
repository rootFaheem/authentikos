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

const removeUser = () => {};

const getUser = () => {};

const getUsersInRomm = () => {};
