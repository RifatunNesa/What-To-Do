const userService = require('./../services/userService');
const sendResponse = require('./../utilities/responseHandler');

exports.getUserByUserName = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const user = await userService.getUserByUserName(userName);

    return sendResponse(req, res, 200, user, 'User Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return sendResponse(req, res, 200, users, 'Users Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getSpecificUsers = async (req, res, next) => {
  try {
    const userNameKey = req.params.userNameKey;
    const users = await userService.getSpecificUsers(userNameKey);

    return sendResponse(req, res, 200, users, 'Users Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userUpdateData = req.body;
    const userName = req.params.userName;
    const updatedUser = await userService.updateUser(userName, userUpdateData);

    return sendResponse(req, res, 200, updatedUser, 'Update Successful', 'success');
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    await userService.deleteUser(userName);

    return sendResponse(req, res, 204, {}, 'Delete Successful', 'success');
  } catch (error) {
    next(error);
  }
};
