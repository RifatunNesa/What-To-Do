const userRepository = require('./../repositories/userRepository');

exports.getUserByUserName = async (userName) => {
  const user = await userRepository.getUserByUserName(userName);
  return user;
};

exports.getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return user;
};

exports.getUsers = async () => {
  const users = await userRepository.getUsers();
  return users;
};

exports.getSpecificUsers = async (userNameKey) => {
  const users = await userRepository.getSpecificUsers(userNameKey);
  return users;
};

exports.createUser = async (userToCreate) => {
  const createdUser = await userRepository.createUser(userToCreate);
  return createdUser;
};

exports.updateUser = async (id, userToUpdate) => {
  const updatedUser = await userRepository.updateUser(id, userToUpdate);
  return updatedUser;
};

exports.deleteUser = async (id) => {
  await user.userRepository.deleteUser(id);
};
