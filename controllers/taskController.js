const taskService = require('./../services/taskService');
const sendResponse = require('./../utilities/responseHandler');
const helperMethods = require('./../utilities/helperMethods');

exports.getTaskById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskById(id);

    return sendResponse(req, res, 200, task, 'Task Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks();

    return sendResponse(req, res, 200, tasks, 'Tasks Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.getTasksByUserName = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { pageSize, pageNumber } = helperMethods.paginationHelper(req.query);
    const tasks = await taskService.getTasksByUserName(userName, pageSize, pageNumber);

    return sendResponse(req, res, 200, tasks, 'Tasks Found', 'success');
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const taskToCreate = req.body;
    const currentUser = req.currentUser;
    const createdTask = await taskService.createTask(taskToCreate, currentUser);

    return sendResponse(req, res, 201, createdTask, 'Task Created', 'success');
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const taskToUpdate = req.body;
    const updatedTask = await taskService.updateTask(id, taskToUpdate);

    return sendResponse(req, res, 200, updatedTask, 'Update Successful', 'success');
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    await taskService.deleteTask(id);

    return sendResponse(req, res, 204, {}, 'Delete Successful', 'success');
  } catch (error) {
    next(error);
  }
};
