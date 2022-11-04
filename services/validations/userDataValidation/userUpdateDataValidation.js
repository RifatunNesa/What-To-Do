const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserUpdateData = (userUpdatedata) => {
  const { fullName, email, password, confirmPassword } = userUpdatedata;
  const emailRegex = /^\w+@\w+\.\w+$/;

  if (email || !emailRegex.test(email)) throw new BadRequestError('Email not valid');

  if (password && confirmPassword) {
    if (password !== confirmPassword) throw new BadRequestError('Both password fields must match');

    if (password.length < 8) throw new BadRequestError('Password length must be at least 8');
  }

  const userToUpdate = {};
  if (fullName) userToUpdate.fullName = fullName;
  if (email) userToUpdate.email = email;
  if (password) userToUpdate.password = password;
  return userToUpdate;
};
