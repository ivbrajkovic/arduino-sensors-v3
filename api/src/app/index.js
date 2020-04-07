/**
 * Express application module
 */

// Express app
const app = require('express')();

// Debug module
const debug = new require('debug')('app:express');

// Config module
const config = require('@api/config');

// Error module
const { errorMessages, ErrorException } = require('@api/errors');

// Logger
app.use(require('morgan')('dev'));

// Enable CORS
app.use(require('cors')());

// Parsers
app.use(require('express').json());
app.use(require('express').urlencoded({ extended: true }));

// Compress response
app.use(require('compression')());

// Serve static
app.use(require('express').static('build'));

// API routes
app.use(`${config.app.baseApiUrl}/user`, require('@api/routes').userRoute);
app.use(`${config.app.baseApiUrl}/data`, require('@api/routes').dataRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) =>
  next(new ErrorException(errorMessages.PAGE_NOT_FOUND))
);

// Deafult error handler
app.use((err, req, res, next) => {
  debug(err);
  const error = new ErrorException(err);
  res.status(error.statusCode).json(ErrorException.responseJson(error));
});

// Export express app
module.exports = app;
