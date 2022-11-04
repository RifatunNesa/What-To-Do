class UnauthorizedError extends Error {
  constructor(message) {
    if (!message) message = 'User is not authorized to perform this operation';
    super(message);
    this.statusCode = 401;
    this.status = 'fail';
    this.isCustomError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UnauthorizedError;
