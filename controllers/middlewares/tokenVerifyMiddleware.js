const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const UnauthorizedError = require('../../utilities/errors/UnauthorizedError');
const userService = require('../../services/userService');

const secretMessage = process.env.JWT_SECRET_MESSAGE || 'secret_message';

const validateDecodedTokenData = (decodedToken) => {
  const { id, userName, iat, exp } = decodedToken;
  if (!id || !userName || !iat || !exp)
    throw new UnauthorizedError('Invalid token. Please login again');
};

const decodeToken = async (bearerToken) => {
  let token = null;
  if (bearerToken && bearerToken.startsWith('Bearer')) {
    token = bearerToken.split(' ')[1];
  }

  if (!token) throw new UnauthorizedError('Login to continue');
  const decodedToken = await promisify(jwt.verify)(token, secretMessage);

  return decodedToken;
};

const getUserBelongingToToken = async (decodedToken) => {
  const { userName, iat } = decodedToken;
  const dbUser = await userService.getUserByUserName(userName);
  if (!dbUser) throw new UnauthorizedError('User belonging to the token does not exist');

  const passwordChangedAtTimeStamp = parseInt(dbUser.passwordChangedAt.getTime() / 1000);

  if (passwordChangedAtTimeStamp > iat)
    throw new UnauthorizedError('Password changed. Login again');

  return dbUser;
};

exports.verifyUserToken = async (req, res, next) => {
  try {
    const decodedToken = await decodeToken(req.headers.authorization);

    validateDecodedTokenData(decodedToken);

    const dbUser = await getUserBelongingToToken(decodedToken);

    const { id, userName } = dbUser;
    req.currentUser = { id, userName };

    next();
  } catch (error) {
    next(error);
  }
};
