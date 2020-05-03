/**
 * User validator
 */

// Express validator middleware
const { param, body } = require('express-validator');

/**************************************************************
 * Check email field
 */
const checkEmail = reqObj =>
  reqObj
    .notEmpty()
    .bail()
    .withMessage('Email must not be empty')
    .trim()
    .isEmail()
    .withMessage('Email is invalid')
    .bail()
    .customSanitizer(value => value.toLowerCase());
/**************************************************************/

/**************************************************************
 * Check text field
 @param {string} name Field name
 */
const checkField = name =>
  body(name)
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .trim()
    .isString()
    .withMessage('Field must be a string')
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage('Field lenght is invalid')
    .bail()
    .customSanitizer(value => value.toLowerCase());
/**************************************************************/

/**************************************************************
 * Check password field
 */
const checkPassword = body('password')
  .notEmpty()
  .withMessage('Password must not be empty')
  .bail()
  .isString()
  .withMessage('Field must be a string')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password length is invalid');
/**************************************************************

/**************************************************************
 * Check confirm password field
 */
const checkCnfirmPassword = body('confirmPassword')
  .notEmpty()
  .withMessage('Password confirmation must not be empty')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password confirmation length is invalid')
  .bail()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  });
/**************************************************************

/**************************************************************
 * Export valitadion object
 */
module.exports = {
  // Login user validator
  login: [checkEmail(body('email')), checkPassword],

  // Register new user validator
  register: [
    checkEmail(body('email')),
    checkField('name'),
    checkField('lastname'),
    checkField('username'),
    checkPassword,
    checkCnfirmPassword
  ],

  // Get user validator
  get: [checkEmail(param('email'))],

  // Delete user validator
  delete: [checkEmail(param('email'))]
};
