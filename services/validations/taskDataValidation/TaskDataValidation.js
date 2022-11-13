const BadRequestError = require('../../../utilities/errors/BadRequestError');

exports.validateTaskData = (taskData) => {
  const { id, name, description, isDone, userID, userName, createdOn, modifiedOn } = taskData;

  const response = { id, name, description, isDone, userID, userName, createdOn, modifiedOn };

  return response;
};
