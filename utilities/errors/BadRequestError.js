class BadRequestError extends Error {
  constructor(message) {
    if (!message) message = 'Server encountered a bad request';
    super(message);
    this.statusCode = 400;
    this.status = 'fail';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BadRequestError;
