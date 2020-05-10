/**
 * Settings router module
 */

// Async wrapper
const { asyncWrapper } = require('./utils');

// Authorization middleware
const { privateRoute } = require('./middleware');

// Data controller
const { SettingsController } = require('./controllers');

// Validators
const { settings: settingsValidator, validate } = require('./validators');

// Express router
const router = require('express').Router();

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Select arduino settings
router.get('/', privateRoute, asyncWrapper(SettingsController.selectAll));

// Select all arduino names in settings
router.get(
  '/names',
  privateRoute,
  asyncWrapper(SettingsController.selectAllNames)
);

// Insert arduino settings
router.get(
  '/:id',
  privateRoute,
  asyncWrapper(validate(settingsValidator.select)),
  asyncWrapper(SettingsController.select)
);

// Insert arduino settings
router.post(
  '/',
  privateRoute,
  asyncWrapper(validate(settingsValidator.insertOrUpdate)),
  asyncWrapper(SettingsController.insert)
);

// Update arduino settings
router.put(
  '/',
  privateRoute,
  asyncWrapper(validate(settingsValidator.insertOrUpdate)),
  asyncWrapper(SettingsController.update)
);

// Export router
module.exports = router;
