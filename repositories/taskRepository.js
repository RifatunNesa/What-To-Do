const Task = require('./../database/models/Task');

exports.getTaskById = async (id) => {
  const task = await Task.findOne({
    where: {
      id,
    },
  });

  if (!task) return null;
  return task.dataValues;
};

exports.getTasks = async () => {
  const tasks = await Task.findAll();
  const tasksData = tasks.map((el) => el.dataValues);

  return tasksData;
};

exports.getTasksCount = async () => {
  const taskCount = await Task.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'id_count']],
  });

  return taskCount[0].dataValues.id_count;
};

exports.getTasksByUserId = async (userId) => {
  const tasks = await Task.findAll({
    where: {
      userId,
    },
  });
  const tasksData = tasks.map((el) => el.dataValues);

  return tasksData;
};

exports.getTasksByUserIdCount = async (userId) => {
  const taskCount = await Task.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'id_count']],
    where: {
      userId,
    },
  });

  return taskCount[0].dataValues.id_count;
};

exports.createTask = async (taskToCreate) => {
  const createdTask = await Task.create(taskToCreate);

  return createdTask.dataValues;
};

exports.updateTask = async (id, taskToUpdate) => {
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  const updatedTask = await task.update(taskToUpdate);

  return updatedTask.dataValues;
};

exports.deleteTask = async (id) => {
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  await task.destroy();

  return;
};
