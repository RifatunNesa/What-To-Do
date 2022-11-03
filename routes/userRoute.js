const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/auth/signUp', authController.signUp);
router.post('/auth/logIn', authController.logIn);

router.route('/').get(userController.getUsers);

router
  .route('/user/:userName')
  .get(userController.getUserByUserName)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/search/:userNameKey').get(userController.getSpecificUsers);

module.exports = router;
