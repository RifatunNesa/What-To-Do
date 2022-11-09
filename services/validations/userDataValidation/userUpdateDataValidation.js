const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserUpdateData = (userUpdatedata) => {
  const { fullName, email, password, confirmPassword } = userUpdatedata;
  const emailRegex = /^\w+@\w+\.\w+$/;

  if (email && !emailRegex.test(email)) throw new BadRequestError('Email not valid');

  if (email && email.length > 255) throw new BadRequestError('Email max length 255');

  if (fullName && fullName.length > 255) throw new BadRequestError('Full name max length 255');

  if (password && confirmPassword) {
    if (password !== confirmPassword) throw new BadRequestError('Both password fields must match');

    if (password.length < 8) throw new BadRequestError('Password length must be at least 8');

    if (password.length > 255) throw new BadRequestError('Password max length 255');
  }

  const response = {};
  if (fullName) response.fullName = fullName;
  if (email) response.email = email;
  if (password) response.password = password;

  return response;
};
