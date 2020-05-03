/**
 * Data validator
 */

// Express validator middleware
const { body, param } = require('express-validator');

/**
 * Check field
 */
const checkField = object =>
  object
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage('Field must contain only number');

/**
 * Export valitadion object
 */
module.exports = {
  // Check number of row param
  selectLastNRows: [checkField(param('n'))],

  // Check value to insert
  insertSensorData: [
    checkField(body('arduino')),
    checkField(body('co2')),
    checkField(body('humidity')),
    checkField(body('temperature'))
  ]
};
