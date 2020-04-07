/**
 * Error exception class
 */

// const dev = require('config').app.env === 'development';

module.exports = class ErrorException {
  constructor(props) {
    this.code = props.code || 'unexpected';
    this.statusCode = props.statusCode || 500;
    this.message = props.message || 'Internal Server Error';
    this.errors = props.errors;
    // this.stack = dev && props.stack;
  }

  /**
   * Return JSON representation of ErrorException object
   * @param {ErrorException} err Error object
   */
  static responseJson(err) {
    return {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        errors: err.errors
        // stack: err.stack
      }
    };
  }
};
