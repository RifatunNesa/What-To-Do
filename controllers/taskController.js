const taskService = require('./../services/taskService');

exports.getTaskById = async (req, res, next) => {
  const task = await taskService.getTaskById(req.param.id);
  return res.status(200).json({});
};

exports.getTasks = async (req, res, next) => {
  const tasks = await taskService.getTasks();
  return res.status(200).json({});
};

exports.getTasksByUserId = async (req, res, next) => {
  const tasks = await taskService.getTasksByUserId(req.param.userId);
  return res.status(200).json({});
};

exports.createTask = async (req, res, next) => {
  const taskToCreate = req.body;
  const createdTask = await taskService.createTask(taskToCreate);
  return res.status(200).json({});
};

exports.updateTask = async (req, res, next) => {
  const taskToUpdate = req.body;
  const updatedTask = await taskService.updateTask(req.param.id, taskToUpdate);
  return res.status(200).json({});
};

exports.deleteTask = async (req, res, next) => {
  return res.status(200).json({});
};
