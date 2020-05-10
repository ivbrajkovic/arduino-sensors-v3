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
 * Check date field
 */
const checkDateField = object =>
  object
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .custom(value => {
      // if (!value.match(/^\d{2}\/\d{2}\/\d{4}$/))
      if (
        !value.match(
          // /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
          /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/
        )
      )
        throw new Error('Invalid date format');
      return true;
    });

/**
 * Export valitadion object
 */
module.exports = {
  // Check number of row param
  selectLastNRows: [checkField(param('n'))],

  // Check from and to req fileds
  fromTo: [checkDateField(body('from')), checkDateField(body('to'))],

  // Check value to insert
  insertSensorData: [
    checkField(body('arduino')),
    checkField(body('co2')),
    checkField(body('humidity')),
    checkField(body('temperature'))
  ]
};
