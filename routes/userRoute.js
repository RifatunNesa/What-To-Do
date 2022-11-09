const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const userAuthMiddleware = require('./../controllers/middlewares/userAuthMidleware');
const tokenVerifyMiddleware = require('./../controllers/middlewares/tokenVerifyMiddleware');

router.post('/auth/signUp', authController.signUp);
router.post('/auth/logIn', authController.logIn);

router
  .route('/user/:userName')
  .get(userController.getUserByUserName)
  .put(
    tokenVerifyMiddleware.verifyUserToken,
    userAuthMiddleware.isAuthorizedForUser,
    userController.updateUser
  )
  .delete(
    tokenVerifyMiddleware.verifyUserToken,
    userAuthMiddleware.isAuthorizedForUser,
    userController.deleteUser
  );

router.route('/search').get(userController.getUsers);
router.route('/search/:userNameKey').get(userController.getSpecificUsers);

module.exports = router;
