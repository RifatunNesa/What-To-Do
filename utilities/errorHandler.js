const sendResponse = require('./responseHandler');
const BadRequestError = require('./errors/BadRequestError');
const UnauthorizedError = require('./errors/UnauthorizedError');

const handleUniqueConstraintErrorDB = () =>
  new BadRequestError('User name and email must be unique');

const handleValidationErrorDB = (error) => {
  const errorMessage = error.errors.map((el) => el.message).join(', ');
  return new BadRequestError(errorMessage);
};

const handleJsonWebTokenError = () => new UnauthorizedError('Invalid token. Please login again');

const handleTokenExpiredError = () => new UnauthorizedError('Token expired. Please login again');

module.exports = (error, req, res, next) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;
  error.message = error.isCustomError ? error.message : 'Something went wrong';

  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      error = handleUniqueConstraintErrorDB();
      break;
    case 'SequelizeValidationError':
      error = handleValidationErrorDB(error);
      break;
    case 'JsonWebTokenError':
      error = handleJsonWebTokenError();
      break;
    case 'TokenExpiredError':
      error = handleTokenExpiredError();
      break;
  }

  return sendResponse(req, res, error.statusCode, {}, error.message, error.status);
};
