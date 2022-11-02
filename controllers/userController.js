const userService = require('./../services/userService');

exports.getUserByUserName = async (req, res, next) => {
  const user = await userService.getUserByUserName(req.params.userName);
  return res.status(200).json({});
};

exports.getUsers = async (req, res, next) => {
  const users = await userService.getUsers();
  return res.status(200).json({});
};

exports.getSpecificUsers = async (req, res, next) => {
  const users = await userService.getSpecificUsers(req.params.userNameKey);
  return res.status(200).json({});
};

exports.createUser = async (req, res, next) => {
  const userToCreate = req.body;
  const createdUser = await userService.createUser(userToCreate);
  return res.status(200).json({});
};

exports.updateUser = async (req, res, next) => {
  const userToUpdate = req.body;
  const updatedUser = await userService.updateUser(id, userToUpdate);
  return res.status(200).json({});
};

exports.deleteUser = async (req, res, next) => {
  await user.userService.deleteUser(req.params.id);
  return res.status(200).json({});
};
