const taskRepository = require('./../repositories/taskRepository');
const NotFoundError = require('./../utilities/errors/NotFoundError');
const BadRequestError = require('./../utilities/errors/BadRequestError');
const taskDataValidation = require('./validations/taskDataValidation/taskDataValidation');
const taskUpdateDataValidation = require('./validations/taskDataValidation/taskUpdateDataValidation');
const taskCreateDataValidation = require('./validations/taskDataValidation/taskCreateDataValidation');

exports.getTaskById = async (id) => {
  if (!id) throw new BadRequestError('Task id not valid');
  const task = await taskRepository.getTaskById(id);
  if (!task) throw new NotFoundError('Task not found');
  const response = taskDataValidation.validateTaskData(task);

  return response;
};

exports.getTasks = async () => {
  const tasks = await taskRepository.getTasks();
  const responses = tasks.map((task) => taskDataValidation.validateTaskData(task));

  return responses;
};

exports.getTasksByUserId = async (userId) => {
  if (!userId) throw new BadRequestError('User id not valid');
  const tasks = await taskRepository.getTasksByUserId(userId);
  const responses = tasks.map((task) => taskDataValidation.validateTaskData(task));

  return responses;
};

exports.createTask = async (taskToCreate) => {
  const taskCreateData = taskCreateDataValidation.validateTaskCreateData(taskToCreate);
  const createdTask = await taskRepository.createTask(taskCreateData);
  const response = taskDataValidation.validateTaskData(createdTask);

  return response;
};

exports.updateTask = async (id, taskToUpdate) => {
  if (!id) throw new BadRequestError('Task id not valid');
  const task = await taskRepository.getTaskById(id);
  if (!task) throw new NotFoundError('Task not found');
  const taskUpdateData = taskUpdateDataValidation.validateTaskUpdateData(taskToUpdate);
  const updatedTask = await taskRepository.updateTask(id, taskUpdateData);
  const response = taskDataValidation.validateTaskData(updatedTask);

  return response;
};

exports.deleteTask = async (id) => {
  if (!id) throw new BadRequestError('Task id not valid');
  const task = await taskRepository.getTaskById(id);
  if (!task) throw new NotFoundError('Task not found');
  await taskRepository.deleteTask(id);
};
