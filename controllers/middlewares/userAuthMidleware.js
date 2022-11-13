const ForbiddenError = require('./../../utilities/errors/ForbiddenError');

exports.isAuthorizedForUser = (req, res, next) => {
  try {
    const userName = req.params.userName;
    const currentUser = req.currentUser;
    if (currentUser.userName !== userName) {
      throw new ForbiddenError('User not authorized for this operation');
    }
    next();
  } catch (error) {
    next(error);
  }
};
