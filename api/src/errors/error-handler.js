/**
 * Error exception class
 */

// const dev = require('config').app.env === 'development';

module.exports = class ErrorException {
  constructor(props) {
    this.code = props.code || 'unexpected';
    this.statusCode = props.statusCode || 500;
    this.message = props.message || 'Internal Server Error';
    this.details = props.details || [];
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
        details: err.details
        // stack: err.stack
      }
    };
  }
};

module.exports = class ErrorHandler extends Error {
  constructor(props) {
    super();
    this.code = props.code || 'unexpected';
    this.statusCode = props.statusCode || 500;
    this.message = props.message || 'Internal Server Error';
    this.details = props.details;
  }

  /**
   * Handle express error
   * @param {object} res Response object
   */
  static handlerError(err, res) {
    res.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message,
      stack: process.env.SHOW_STACK_TRACE && err.stack,
      details: err.details
    });
  }
};
