const BadRequestError = require('../../../utilities/errors/BadRequestError');

exports.validateTaskData = (taskData) => {
  const { id, name, description, isDone, userId, userName, createdOn, modifiedOn } = taskData;

  const response = { id, name, description, isDone, userId, userName, createdOn, modifiedOn };

  return response;
};
