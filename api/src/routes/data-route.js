/**
 * Data router module
 */

// Async wrapper
const { asyncWrapper } = require('./utils');

// Authorization middleware
const { privateRoute } = require('./middleware');

// Data controller
const { DataController } = require('./controllers');

// Validators
const { data: dataValidator, validate } = require('./validators');

// Express router
const router = require('express').Router();

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Get last N rows of data
router.get(
  '/:n',
  privateRoute,
  asyncWrapper(validate(dataValidator.selectLastNRows)),
  asyncWrapper(DataController.selectLastNRows)
);

// Get data between
router.post(
  '/fromto',
  privateRoute,
  asyncWrapper(validate(dataValidator.fromTo)),
  asyncWrapper(DataController.selectFromTo)
);

// TODO Authenticate arduino client

// Insert sensor data
router.post(
  '/',
  /* authenticate, */
  asyncWrapper(validate(dataValidator.insertSensorData)),
  asyncWrapper(DataController.insertSensorData)
);

// Delete all sensor data route
router.delete(
  '/',
  privateRoute,
  asyncWrapper(DataController.deleteAllSensorData)
);

// Export router
module.exports = router;
