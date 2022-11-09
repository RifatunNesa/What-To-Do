const bcrypt = require('bcryptjs');
const userRepository = require('./../repositories/userRepository');
const BadRequestError = require('./../utilities/errors/BadRequestError');
const NotFoundError = require('./../utilities/errors/NotFoundError');
const UnauthorizedError = require('./../utilities/errors/UnauthorizedError');
const userDataVaidation = require('./validations/userDataValidation/userDataValidation');
const userCreateDataValidation = require('./validations/userDataValidation/userCreateDataValidation');
const userUpdateDataValidation = require('./validations/userDataValidation/userUpdateDataValidation');

exports.validatePassword = async (userName, candidatePassword) => {
  if (!userName || !candidatePassword) throw new BadRequestError('Invalid Input');
  const user = await userRepository.getUserByUserName(userName);
  if (!user) throw new NotFoundError('User not found');
  const isValid = await bcrypt.compare(candidatePassword, user.password);
  if (!isValid) throw new UnauthorizedError('Incorrect user name or password');
};

exports.getUserByUserName = async (userName) => {
  if (!userName) throw new BadRequestError('User name not valid');
  const user = await userRepository.getUserByUserName(userName);
  if (!user) throw new NotFoundError('User not found');

  const response = userDataVaidation.validateUserData(user);

  return response;
};

exports.getUserById = async (id) => {
  if (!id) throw new BadRequestError('User id not valid');
  const user = await userRepository.getUserById(id);
  if (!user) throw new NotFoundError('User not found');

  const response = userDataVaidation.validateUserData(user);

  return response;
};

exports.getUsers = async () => {
  const users = await userRepository.getUsers();
  const responses = users.map((user) => userDataVaidation.validateUserData(user));

  return responses;
};

exports.getSpecificUsers = async (userNameKey) => {
  if (!userNameKey) throw new BadRequestError();
  const users = await userRepository.getSpecificUsers(userNameKey);
  const responses = users.map((user) => userDataVaidation.validateUserData(user));

  return responses;
};

exports.createUser = async (userCreateData) => {
  userCreateData = userCreateDataValidation.validateUserCreateData(userCreateData);
  userCreateData.password = await bcrypt.hash(userCreateData.password, 12);

  const currentTime = new Date();
  userCreateData.passwordChangedAt = currentTime;
  userCreateData.createdOn = currentTime;
  userCreateData.modifiedOn = currentTime;

  const createdUser = await userRepository.createUser(userCreateData);
  const response = userDataVaidation.validateUserData(createdUser);

  return response;
};

exports.updateUser = async (userName, userUpdateData) => {
  if (!userName) throw new BadRequestError('User name not valid');
  const user = await userRepository.getUserByUserName(userName);
  if (!user) throw new NotFoundError('User not found');
  userUpdateData = userUpdateDataValidation.validateUserUpdateData(userUpdateData);
  if (userUpdateData.password)
    userUpdateData.password = await bcrypt.hash(userUpdateData.password, 12);

  const currentTime = new Date();
  if (userUpdateData.password) userUpdateData.passwordChangedAt = currentTime;
  userUpdateData.modifiedOn = currentTime;

  const updatedUser = await userRepository.updateUser(userName, userUpdateData);
  const response = userDataVaidation.validateUserData(updatedUser);

  return response;
};

exports.deleteUser = async (userName) => {
  if (!userName) throw new BadRequestError('User name not valid');
  const user = await userRepository.getUserByUserName(userName);
  if (!user) throw new NotFoundError('User not found');
  await userRepository.deleteUser(userName);
};
