const userService = require('./../services/userService');
const sendResponse = require('./../utilities/responseHandler');

exports.signUp = async (req, res, next) => {
  try {
    const userToCreate = req.body;
    const createdUser = await userService.createUser(userToCreate);

    return sendResponse(req, res, 201, createdUser, 'User created', 'success');
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  return res.status(200).json({});
};
