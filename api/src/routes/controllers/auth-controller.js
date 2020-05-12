/**
 * Auth controller
 */

// Debug
var debug = new require('debug')('api:controllers:AuthController');

// Config
const config = require('@api/config');

// User services
const { AuthService, UserService } = require('@api/services');

module.exports = class AuthController {
  /**************************************************************
   * Login user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static loginUser = async req => {
    const { email, password } = req.body;

    // Check user by email and password
    const user = await UserService.checkUserByEmailAndPassword({
      email,
      password
    });

    // Create json web token
    const token = AuthService.createJWT({ email }, config.app.jwtSecret, {
      expiresIn: config.app.jwtExp
    });

    // Log status success
    debug(`JWT for ${email} created successfully`);

    // Return user object with token
    return { user, token };
  };

  /**************************************************************
   * Register new user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static registerUser = async req => {
    const { email, name, lastname, username, password } = req.body;
    const { user } = await UserService.registerNewUser({
      email,
      name,
      lastname,
      username,
      password
    });

    // Create json web token
    const token = AuthService.createJWT({ email }, config.app.jwtSecret, {
      expiresIn: config.app.jwtExp
    });

    // Return user object with token
    return { user, token };
  };
};
