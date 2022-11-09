const ForbiddenError = require('./../../utilities/errors/ForbiddenError');

exports.isAuthorizedForUser = (req, res, next) => {
  try {
    if (req.currentUser.userName !== req.params.userName) {
      throw new ForbiddenError('User not authorized for this operation');
    }
    next();
  } catch (error) {
    next(error);
  }
};
