/**
 * Settings validator
 */

// Express validator middleware
const { param, body } = require('express-validator');

/**
 * Check input field
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
  select: [checkField(param('id'))],

  insertOrUpdate: [
    checkField(body('arduino')),
    checkField(body('fan')),
    checkField(body('led')),
    checkField(body('updateInterval')),
    checkField(body('co2.min')),
    checkField(body('co2.max')),
    checkField(body('humidity.min')),
    checkField(body('humidity.max')),
    checkField(body('temperature.min')),
    checkField(body('temperature.max'))
  ]
};
