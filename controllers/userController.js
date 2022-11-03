const userService = require('./../services/userService');

exports.getUserByUserName = async (req, res, next) => {
  const userName = req.params.userName;
  const user = await userService.getUserByUserName(userName);

  return res.status(200).json(user);
};

exports.getUsers = async (req, res, next) => {
  const users = await userService.getUsers();

  return res.status(200).json(users);
};

exports.getSpecificUsers = async (req, res, next) => {
  const userNameKey = req.params.userNameKey;
  const users = await userService.getSpecificUsers(userNameKey);

  return res.status(200).json(users);
};

exports.createUser = async (req, res, next) => {
  const userToCreate = req.body;
  const createdUser = await userService.createUser(userToCreate);

  return res.status(201).json(createdUser);
};

exports.updateUser = async (req, res, next) => {
  const userToUpdate = req.body;
  const userName = req.params.userName;
  const updatedUser = await userService.updateUser(userName, userToUpdate);

  return res.status(200).json(updatedUser);
};

exports.deleteUser = async (req, res, next) => {
  const userName = req.params.userName;
  await userService.deleteUser(userName);
  return res.status(204).json({});
};
