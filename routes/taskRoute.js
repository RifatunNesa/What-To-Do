const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/taskController');
const taskAuthMiddleware = require('./../controllers/middlewares/taskAuthMiddleware');
const userAuthMidleware = require('./../controllers/middlewares/userAuthMidleware');
const tokenVerifyMiddleware = require('./../controllers/middlewares/tokenVerifyMiddleware');

router.route('/task').post(tokenVerifyMiddleware.verifyUserToken, taskController.createTask);

router
  .route('/task/:id')
  .get(
    tokenVerifyMiddleware.verifyUserToken,
    taskAuthMiddleware.isAuthorizedForTask,
    taskController.getTaskById
  )
  .put(
    tokenVerifyMiddleware.verifyUserToken,
    taskAuthMiddleware.isAuthorizedForTask,
    taskController.updateTask
  )
  .delete(
    tokenVerifyMiddleware.verifyUserToken,
    taskAuthMiddleware.isAuthorizedForTask,
    taskController.deleteTask
  );

router
  .route('/user/:userName')
  .get(
    tokenVerifyMiddleware.verifyUserToken,
    userAuthMidleware.isAuthorizedForUser,
    taskController.getTasksByUserName
  );

module.exports = router;
