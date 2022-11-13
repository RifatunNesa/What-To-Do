const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/taskController');

router.route('/task').get(taskController.getTasks).post(taskController.createTask);

router
  .route('/task/:id')
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route('/user/:userName').get(taskController.getTasksByUserName);

module.exports = router;
