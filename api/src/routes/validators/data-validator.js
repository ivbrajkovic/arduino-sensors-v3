/**
 * Data validator
 */

// Express validator middleware
const { body } = require('express-validator');

/**
 * Check field
 */
const checkField = name =>
  body(name)
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage('Field contain only number');

/**
 * Export valitadion object
 */
module.exports = {
  insertSensorData: [
    checkField('arduino'),
    checkField('co2'),
    checkField('humidity'),
    checkField('temperature')
  ]
};
