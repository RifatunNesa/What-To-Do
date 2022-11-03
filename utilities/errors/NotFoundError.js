class NotFoundError extends Error {
  constructor(message) {
    if (!message) message = 'Record was not found in the system';
    super(message);
    this.statusCode = 404;
    this.status = 'fail';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotFoundError;
