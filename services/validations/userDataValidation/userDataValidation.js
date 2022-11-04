const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserData = (userdata) => {
  const { id, userName, fullName, email, passwordChangedAt, createdOn, modifiedOn } = userdata;

  return { id, userName, fullName, email, passwordChangedAt, createdOn, modifiedOn };
};
