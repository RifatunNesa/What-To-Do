const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserCreateData = (userCreatedata) => {
  const { userName, fullName, email, password, confirmPassword } = userCreatedata;
  const userNameRegex = /^[a-z0-9_]+$/;
  const emailRegex = /^\w+@\w+\.\w+$/;

  if (!userName || !fullName || !email || !password || !confirmPassword)
    throw new BadRequestError('Not all required fields are provided');

  if (!userNameRegex.test(userName))
    throw new BadRequestError('Only lowercase letter, digits and underscores allowed in user name');

  if (userName.length > 255) throw new BadRequestError('User name max length 255');

  if (fullName.length > 255) throw new BadRequestError('Full name max length 255');

  if (!emailRegex.test(email)) throw new BadRequestError('Email not valid');

  if (email.length > 255) throw new BadRequestError('Email max length 255');

  if (password !== confirmPassword) throw new BadRequestError('Both password fields must match');

  if (password.length < 8) throw new BadRequestError('Password length must be at least 8');

  if (password.length > 255) throw new BadRequestError('Password max length 255');

  const response = { userName, fullName, email, password, confirmPassword };

  return response;
};
