class MethodNotAllowedError extends Error {
  constructor(message) {
    if (!message) message = 'Request not supported';
    super(message);
    this.statusCode = 405;
    this.status = 'fail';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = MethodNotAllowedError;
