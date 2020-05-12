/**
 * Authorization service
 */

// Debug
const debug = new require('debug')('api:services:AuthService');

// JWT
const jwt = require('jsonwebtoken');

// Configuration
const config = require('@api/config');

// Errors
const { errorMessages, ErrorHandler } = require('@api/errors');

// Authentication class
module.exports = class AuthService {
  // Token exp time
  static jwtExp = config.app.jwtExp;

  // Access token secret
  static jwtSecret = config.app.jwtSecret;

  /**
   * Create JWT
   @param {*} obj Objevt uppon witch create JWT
   @returns JWT
   */
  static createJWT = obj =>
    jwt.sign(obj, this.jwtSecret, { expiresIn: this.jwtExp });

  static decodeJWT = token => {
    try {
      // Decode token
      const decoded = jwt.verify(token, this.jwtSecret);

      // Log decoded token
      debug(decoded);

      // Return decoded token
      return decoded;
    } catch (error) {
      throw new ErrorHandler(
        error.name === jwt.TokenExpiredError.name
          ? errorMessages.JWT_TOKEN_EXPIRED
          : errorMessages.JWT_UNKNOWN
      );
    }
  };

  /**
   * Async verify JWT
   @param {*} req Client request
   @returns Decoded JWT
   */
  static verifyJWT = async req => {
    // Get auth header
    let authHeader = req.headers['authorization'];
    if (!authHeader) throw new ErrorHandler(errorMessages.JWT_TOKEN_NOT_FOUND);

    // Vreify auth header
    if (!authHeader.startsWith('Bearer '))
      throw new ErrorHandler(errorMessages.JWT_TOKEN_INVALID);

    // Get token from header
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new ErrorHandler(errorMessages.JWT_TOKEN_NOT_FOUND);

    try {
      // Decode token
      const decoded = jwt.verify(token, this.jwtSecret);

      // Log decoded token
      debug(decoded);

      // Return decoded token
      return decoded;
    } catch (error) {
      throw new ErrorHandler(
        error.name === jwt.TokenExpiredError.name
          ? errorMessages.JWT_TOKEN_EXPIRED
          : errorMessages.JWT_UNKNOWN
      );
    }
  };
};
