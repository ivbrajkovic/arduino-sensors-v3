/**
 * Recquest data validator wrapper
 */

// Expresss validator
const { validationResult } = require('express-validator');

// Errors
const { errorMessages, ErrorException } = require('@api/errors');

// Validation wrapper
module.exports = validations => {
  /**
   * Express middleware
   */
  return async (req, res, next) => {
    // Add validation to request object
    await Promise.all(validations.map(validation => validation.run(req)));

    // Validate data and continue if no errors found
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    // Format error message
    const error = new ErrorException({
      ...errorMessages.DATA_REQUEST_INVALID,
      errors: errors.array()
    });

    // Throw error to default handler
    next(error);
  };
};
