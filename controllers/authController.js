const userService = require('./../services/userService');
const authService = require('./../services/authService');
const jwtHandler = require('./../utilities/jwtHandler');
const sendResponse = require('./../utilities/responseHandler');

exports.signUp = async (req, res, next) => {
  try {
    const userCreateData = req.body;
    const createdUser = await userService.createUser(userCreateData);
    const { id, userName } = createdUser;
    const token = jwtHandler.createToken(id, userName);

    return sendResponse(req, res, 201, { token }, 'User created', 'success');
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    await authService.validatePassword(userName, password);

    const user = await userService.getUserByUserName(userName);
    const { id } = user;

    const token = jwtHandler.createToken(id, userName);

    return sendResponse(req, res, 200, { token }, 'User logged in', 'success');
  } catch (error) {
    next(error);
  }
};
