/**
 * Data router module
 */

// Async wrapper
const { asyncWrapper } = require('./utils');

// Authorization middleware
// const { authenticate } = require('../middleware');

// Data controller
const { DataController } = require('./controllers');

// Validators
const { data: dataValidator, validate } = require('./validators');

// Express router
const router = require('express').Router();

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// TODO Authenticate arduino client

// TODO Uncoment auth middleware

// Insert sensor data
router.post(
  '/',
  /* authenticate, */
  validate(dataValidator.insertSensorData),
  asyncWrapper(DataController.insertSensorData)
);

// Export router
module.exports = router;
