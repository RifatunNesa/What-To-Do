const BadRequestError = require('./../../../utilities/errors/BadRequestError');

exports.validateUserData = (userdata) => {
  const { id, userName, fullName, email, passwordChangedAt, createdOn, modifiedOn } = userdata;

  const response = { id, userName, fullName, email, passwordChangedAt, createdOn, modifiedOn };

  return response;
};
