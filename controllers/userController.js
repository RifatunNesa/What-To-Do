const userService = require('./../services/userService');
const sendRespponse = require('./../utilities/responseHandler');

exports.getUserByUserName = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const user = await userService.getUserByUserName(userName);

    return sendRespponse(req, res, 200, user, 'User Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return sendRespponse(req, res, 200, users, 'Users Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getSpecificUsers = async (req, res, next) => {
  try {
    const userNameKey = req.params.userNameKey;
    const users = await userService.getSpecificUsers(userNameKey);

    return sendRespponse(req, res, 200, users, 'Users Found', 'success');
  } catch (error) {
    next(error);
  }
};

/*
exports.createUser = async (req, res, next) => {
  try {
    const userToCreate = req.body;
    const createdUser = await userService.createUser(userToCreate);
    return sendRespponse(req, res, 200, users, 'Users Found', 'success');

    return res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};
*/

exports.updateUser = async (req, res, next) => {
  try {
    const userToUpdate = req.body;
    const userName = req.params.userName;
    const updatedUser = await userService.updateUser(userName, userToUpdate);

    return sendRespponse(req, res, 200, updatedUser, 'Update Successful', 'success');
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    await userService.deleteUser(userName);

    return sendRespponse(req, res, 204, {}, 'Delete Successful', 'success');
  } catch (error) {
    next(error);
  }
};
