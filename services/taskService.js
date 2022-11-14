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

exports.getTasks = async (pageSize, pageNumber) => {
  const tasks = await taskRepository.getTasks(pageSize, pageNumber);
  const tasksCount = await taskRepository.getTasksCount();
  const totalPage = parseInt((Number(tasksCount) + pageSize - 1) / pageSize);
  const validatedTasks = tasks.map((task) => taskDataValidation.validateTaskData(task));

  const response = {
    data: validatedTasks,
    pageNumber,
    pageSize,
    totalPage,
  };

  return response;
};

exports.getTasksByUserName = async (userName, pageSize, pageNumber) => {
  if (!userName) throw new BadRequestError('User name not valid');
  const tasks = await taskRepository.getTasksByUserName(userName, pageSize, pageNumber);
  const tasksCount = await taskRepository.getTasksByUserNameCount(userName);
  const totalPage = parseInt((Number(tasksCount) + pageSize - 1) / pageSize);
  const validatedTasks = tasks.map((task) => taskDataValidation.validateTaskData(task));

  const response = {
    data: validatedTasks,
    pageNumber,
    pageSize,
    totalPage,
  };

  return response;
};

exports.createTask = async (taskToCreate, currentUser) => {
  const taskCreateData = taskCreateDataValidation.validateTaskCreateData(taskToCreate);

  const currentTime = new Date();
  taskCreateData.createdOn = currentTime;
  taskCreateData.modifiedOn = currentTime;
  taskCreateData.userId = currentUser.id;
  taskCreateData.userName = currentUser.userName;

  const createdTask = await taskRepository.createTask(taskCreateData);
  const response = taskDataValidation.validateTaskData(createdTask);

  return response;
};

exports.updateTask = async (id, taskToUpdate) => {
  if (!id) throw new BadRequestError('Task id not valid');
  const task = await taskRepository.getTaskById(id);
  if (!task) throw new NotFoundError('Task not found');
  const taskUpdateData = taskUpdateDataValidation.validateTaskUpdateData(taskToUpdate);

  const currentTime = new Date();
  taskUpdateData.modifiedOn = currentTime;

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
