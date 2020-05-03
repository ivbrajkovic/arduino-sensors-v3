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
  asyncWrapper(validate(userValidator.login)),
  asyncWrapper(AuthController.loginUser)
);

// Register user route
router.post(
  '/register',
  asyncWrapper(validate(userValidator.register)),
  asyncWrapper(AuthController.registerUser)
);

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Get user route
router.get('/verify', privateRoute, asyncWrapper(UserController.verifyToken));

// Get user route
router.get(
  '/:email',
  privateRoute,
  validate(userValidator.get),
  asyncWrapper(UserController.getUser)
);

// Update user route
router.put(
  '/',
  privateRoute,
  validate(userValidator.register),
  asyncWrapper(UserController.updateUserByEmail)
);

// Delete user route
router.delete(
  '/:email',
  privateRoute,
  validate(userValidator.delete),
  asyncWrapper(UserController.deleteUser)
);

// Delete all users route
router.delete('/', privateRoute, asyncWrapper(UserController.deleteAllUsers));

// Export router
module.exports = router;
