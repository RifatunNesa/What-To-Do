const sendResponse = require('./responseHandler');
const BadRequestError = require('./errors/BadRequestError');

const handleUniqueConstraintErrorDB = () =>
  new BadRequestError('User name and email must be unique');

module.exports = (error, req, res, next) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;
  error.message = error.isCustomError ? error.message : 'Something went wrong';

  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      error = handleUniqueConstraintErrorDB();
      break;
  }

  return sendResponse(req, res, error.statusCode, {}, error.message, error.status);
};
