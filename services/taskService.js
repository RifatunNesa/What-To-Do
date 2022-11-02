const taskRepository = require('./../repositories/taskRepository');

exports.getTaskById = async (id) => {
  const task = await taskRepository.getTaskById(id);
  return task;
};

exports.getTasks = async () => {
  const tasks = await taskRepository.getTasks();
  return tasks;
};

exports.getTasksByUserId = async (userId) => {
  const tasks = await taskRepository.getTasksByUserId(userId);
  return tasks;
};

exports.createTask = async (taskToCreate) => {
  const createdTask = await taskRepository.createTask(taskToCreate);
  return createdTask;
};

exports.updateTask = async (id, taskToUpdate) => {
  const updatedTask = await taskRepository.updateTask(id, taskToUpdate);
  return updatedTask;
};

exports.deleteTask = async (id) => {
  await taskRepository.deleteTask(id);
};
