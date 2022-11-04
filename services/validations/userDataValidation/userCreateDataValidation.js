const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserCreateData = (userCreatedata) => {
  const { userName, fullName, email, password, confirmPassword } = userCreatedata;
  const userNameRegex = /^[a-z0-9_]+$/;
  const emailRegex = /^\w+@\w+\.\w+$/;

  if (!userName || !fullName || !email || !password || !confirmPassword)
    throw new BadRequestError('Not all required fields are filled');

  if (!userNameRegex.test(userName))
    throw new BadRequestError('Only lowercase letter, digits and underscores allowed in user name');

  if (!emailRegex.test(email)) throw new BadRequestError('Email not valid');

  if (password !== confirmPassword) throw new BadRequestError('Both password fields must match');

  if (password.length < 8) throw new BadRequestError('Password length must be at least 8');

  return { userName, fullName, email, password, confirmPassword };
};
