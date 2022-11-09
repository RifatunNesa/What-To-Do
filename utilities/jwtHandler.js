const jwt = require('jsonwebtoken');

const secretMessage = process.env.JWT_SECRET_MESSAGE || 'secret_message';
const tokenDuration = process.env.JWT_EXPIRES_IN || '10D';

exports.createToken = (id, userName) => {
  return jwt.sign({ id, userName }, secretMessage, {
    expiresIn: tokenDuration,
  });
};
