/**
 * Router user module
 */

// Express router
const router = require('express').Router();

// Async middleware wrapper
const { asyncWrapper } = require('./utils');

// Authorization middleware
const { privateRoute } = require('./middleware');

// User controllers
const { AuthController, UserController } = require('./controllers');

// Validators
const { user: userValidator, validate } = require('./validators');

/***********************************************
 * PUBLIC ROUTES
 ***********************************************/

// Login user route
router.post(
  '/login',
  validate(userValidator.login),
  asyncWrapper(AuthController.loginUser)
);

// Register user route
router.post(
  '/register',
  validate(userValidator.register),
  asyncWrapper(AuthController.registerUser)
);

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Get user route
router.get(
  '/:email',
  privateRoute,
  validate(userValidator.get),
  asyncWrapper(UserController.getUser)
);

// Delete user route
router.delete(
  '/:email',
  privateRoute,
  validate(userValidator.delete),
  asyncWrapper(UserController.deleteUser)
);

// Export router
module.exports = router;
