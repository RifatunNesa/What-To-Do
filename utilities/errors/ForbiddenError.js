class ForbiddenError extends Error {
  constructor(message) {
    if (!message) message = 'User is not allowed to perform this operation';
    super(message);
    this.statusCode = 403;
    this.status = 'fail';
    this.isCustomError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ForbiddenError;
