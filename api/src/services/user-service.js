/**
 * User services
 */

// Debug
const debug = new require('debug')('app:services:UserService');

// Config
const config = require('@api/config');

// Encrypt service
const EncryptService = require('./encrypt-service');

// Errors
const { errorMessages, ErrorException } = require('@api/errors');

// User service class
module.exports = class UserService {
  // Db path
  static dbDir = config.db.dbDirAlias;

  /**
   * PRIVATE METHOD
   * Remove props from user object
   @param {*} user User object
   @returns {*} User object
   */
  static _formatReturnUserPrivate = ({ user }) => {
    // Remove pasword from user object
    delete user.password;

    // Remove registration date
    delete user.date;

    // Return user w/o password
    return { user };
  };

  /**
   * PRIVATE METHOD
   * Private get user by email
   @param {*} user User data
   @returns {*} User and token (w/o password)
   */
  static _getUserByEmailPrivate = async email => {
    // Database users object reference
    const { users: usersDb } = await require(this.dbDir);
    const user = await usersDb.select(email);

    // Get user from database
    return { user, usersDb };
  };

  /**
   * Get user by email
   @param {*} user User data
   @returns {*} User and token (w/o password)
   */
  static getUserByEmail = async ({ email }) => {
    // Check if user already exist in database
    const { user, usersDb } = await this._getUserByEmailPrivate(email);

    // Throw if user does not exist in database
    if (!user) throw new ErrorException(errorMessages.USER_NOT_EXIST);

    // Log status success
    debug(`User ${user.name} retreived successfully`);

    // Return user object w/o password
    return this._formatReturnUserPrivate({ user });
  };

  /**
   * Delete user by email
   @param {*} user User email
   @returns {*} Deleted user object w/o password
   */
  static deleteUserByEmail = async ({ email }) => {
    // Check if user already exist in database
    const { user, usersDb } = await this._getUserByEmailPrivate(email);

    // Throw if user does not exist in database
    if (!user) throw new ErrorException(errorMessages.USER_NOT_EXIST);

    // Delete user by email
    await usersDb.delete(email);

    // Log status success
    debug(`User ${user.name} deleted successfully`);

    // Return user object w/o password
    return this._formatReturnUserPrivate({ user });
  };

  /**
   * Create new user
   @param {*} user User data
   @returns {*} User object w/o password
   */
  static registerNewUser = async ({
    email,
    name,
    lastname,
    nickname,
    password
  }) => {
    // Check if user already exist in database
    const { user, usersDb } = await this._getUserByEmailPrivate(email);

    // Throw if user does already exist in database
    if (user) throw new ErrorException(errorMessages.USER_EXIST);

    // Hash user password
    const hashedPassword = await EncryptService.hashPassword(password);

    // Inser user into database
    await usersDb.insert([email, name, lastname, nickname, hashedPassword]);

    // Log status success
    debug(`User ${name} created successfully`);

    // Return user w/o password
    return { user: { email, name, lastname, nickname } };
  };

  /**
   * Check user by email and password
   @param {*} user User email and password
   @returns {*} User object w/o password
   */
  static checkUserByEmailAndPassword = async ({ email, password }) => {
    // Check if user already exist in database
    const { user } = await this._getUserByEmailPrivate(email);

    // Throw if user does not exist in database
    if (!user) throw new ErrorException(errorMessages.USER_NOT_EXIST);

    // Exit if password do not match
    if (!(await EncryptService.comparePasswords(password, user.password)))
      // if (!(await bcrypt.compare(password, user.password)))
      throw new ErrorException(errorMessages.USER_PASSWORD_NOT_MATCH);

    // Log status success
    debug(`User ${user.name} credentials are valid`);

    // Return user w/o password
    return this._formatReturnUserPrivate({ user });
  };
};
