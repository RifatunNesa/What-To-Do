const BadRequestError = require('../../../utilities/errors/BadRequestError');

exports.validateTaskData = (taskData) => {
  const { id, name, description, isDone } = taskData;

  const response = { id, name, description, isDone };

  return response;
};
