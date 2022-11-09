const bcrypt = require('bcryptjs');
const NotFoundError = require('./../utilities/errors/NotFoundError');
const BadRequestError = require('./../utilities/errors/BadRequestError');
const UnauthorizedError = require('./../utilities/errors/UnauthorizedError');
const userRepository = require('./../repositories/userRepository');

exports.validatePassword = async (userName, candidatePassword) => {
  if (!userName || !candidatePassword) throw new BadRequestError('Invalid Input');
  const user = await userRepository.getUserByUserName(userName);
  if (!user) throw new NotFoundError('User not found');
  const isValid = await bcrypt.compare(candidatePassword, user.password);
  if (!isValid) throw new UnauthorizedError('Incorrect user name or password');
};
