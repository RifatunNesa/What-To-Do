const BadRequestError = require('./../../../utilities/errors/BadRequestError');

const isNullOrUndefined = (val) => {
  if (val == null || val == undefined) return true;
  return false;
};

exports.validateTaskUpdateData = (taskUpdateData) => {
  const { name, description, isDone } = taskUpdateData;

  if (name && name.length > 255) throw new BadRequestError('Task name max length 255');

  if (description && description.length > 255)
    throw new BadRequestError('Task description max length 255');

  const taskToUpdate = {};
  if (name) taskToUpdate.name = name;
  if (description) taskToUpdate.description = description;
  if (!isNullOrUndefined(isDone)) taskToUpdate.isDone = isDone;

  return taskToUpdate;
};
