const bcrypt = require('bcryptjs');
const userRepository = require('./../repositories/userRepository');
const BadRequestError = require('./../utilities/errors/BadRequestError');
const NotFoundError = require('./../utilities/errors/NotFoundError');
const userDataVaidation = require('./validations/userDataValidation/userDataValidation');
const userCreateDataValidation = require('./validations/userDataValidation/userCreateDataValidation');
const userUpdateDataValidation = require('./validations/userDataValidation/userUpdateDataValidation');

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

exports.getUsers = async (pageSize, pageNumber) => {
  const users = await userRepository.getUsers(pageSize, pageNumber);
  const usersCount = await userRepository.getUsersCount();
  const totalPage = parseInt((Number(usersCount) + pageSize - 1) / pageSize);
  const validatedUsers = users.map((user) => userDataVaidation.validateUserData(user));

  const response = {
    data: validatedUsers,
    pageNumber,
    pageSize,
    totalPage,
  };

  return response;
};

exports.getSpecificUsers = async (userNameKey, pageSize, pageNumber) => {
  if (!userNameKey) throw new BadRequestError();
  const users = await userRepository.getSpecificUsers(userNameKey, pageSize, pageNumber);
  const usersCount = await userRepository.getSpecificUsersCount(userNameKey);
  const totalPage = parseInt((Number(usersCount) + pageSize - 1) / pageSize);
  const validatedUsers = users.map((user) => userDataVaidation.validateUserData(user));

  const response = {
    data: validatedUsers,
    pageNumber,
    pageSize,
    totalPage,
  };

  return response;
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
