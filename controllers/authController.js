const userService = require('./../services/userService');

exports.signUp = async (req, res, next) => {
  const userToCreate = req.body;
  const createdUser = await userService.createUser(userToCreate);

  return res.status(200).json(createdUser);
};

exports.logIn = async (req, res, next) => {
  return res.status(200).json({});
};
