const BadRequestError = require('../../../utilities/errors/BadRequestError');

const isNullOrUndefined = (val) => {
  if (val == null || val == undefined) return true;
  return false;
};

exports.validateTaskData = (taskData) => {
  const { id, name, description, isDone } = taskData;

  if (!name || !description || isNullOrUndefined(isDone))
    throw new BadRequestError('Not all required fields are provided');

  if (name.length > 255) throw new BadRequestError('Task name max length 255');

  if (description.length > 255) throw new BadRequestError('Task description max length 255');

  const response = { id, name, description, isDone };

  return response;
};
