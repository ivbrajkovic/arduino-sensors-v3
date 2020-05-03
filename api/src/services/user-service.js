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
const { errorMessages, ErrorHandler } = require('@api/errors');

// User service class
module.exports = class UserService {
  // Db path
  static dbDir = config.db.dbDirAlias;

  /**************************************************************
   * PRIVATE METHODS
   **************************************************************/

  /**************************************************************
   * Remove props from user object
   @param {*} user User object
   @returns {*} User object
   */
  static _formatReturnUserPrivate = user => {
    if (!user) return;

    // Remove pasword from user object
    delete user.password;

    // Remove registration date
    delete user.date;

    // Return user w/o password
    return user;
  };
  /**************************************************************/

  /**************************************************************
   * Get databse users object
   @returns {object} Database or null
   */
  static _getDatabase = async () => {
    // Database users object reference
    const db = (await require(this.dbDir)).users;

    // Return database user reference
    return db;
  };
  /**************************************************************/

  /**************************************************************
   * Get user from database
   @param {string} email User email
   @param {object} [db] Database
   @returns {object} User or null
   */
  static _getUser = async (email, db) => {
    // Database users object reference
    !db && (db = await _getDatabase());

    // Get user
    const user = await db.select(email);

    // Return database user reference
    return user;
  };
  /**************************************************************/

  /**************************************************************
   * Private, check user and get database reference
   @param {object} params Email and optional params
   @returns {object} User and db.users reference
   */
  static _checkUser = async ({
    email,
    throwIfExist = false,
    throwIfNotExist = false
  }) => {
    // Database users object reference
    const db = await this._getDatabase();

    // Get user
    const user = await this._getUser(email, db);

    // Throw if user do already exist in database
    if (throwIfExist && user) throw new ErrorHandler(errorMessages.USER_EXIST);

    // Throw if user do not exist in database
    if (throwIfNotExist && !user)
      throw new ErrorHandler(errorMessages.USER_NOT_EXIST);
    // throw errorMessages.USER_NOT_EXIST;

    // Return user and db reference
    return { user, db };
  };
  /**************************************************************/

  /**************************************************************
   * PUBLIC METHODS
   **************************************************************/

  /**************************************************************
   * Get user by email
   @param {*} user User data
   @returns {*} User and token (w/o password)
   */
  static getUserByEmail = async email => {
    // Check if user already exist in database
    const { user } = await this._checkUser({
      email,
      throwIfNotExist: true
    });

    // Log status success
    debug(`User ${user.name} retreived successfully`);

    // Return user object w/o password
    return this._formatReturnUserPrivate(user);
  };
  /**************************************************************/

  /**************************************************************
   * Update user by email
   @param {*} user User data
   @returns {*} User and token (w/o password)
   */
  static updateUserByEmail = async ({
    email,
    name,
    lastname,
    nickname,
    password
  }) => {
    // Check if user already exist in database
    const { user, db } = await this._checkUser({
      email,
      throwIfNotExist: true
    });

    // Hash user password
    const hashedPassword = await EncryptService.hashPassword(password);

    // Update user into database, last param must be email !!!
    const changes = await db.update([
      name,
      lastname,
      nickname,
      hashedPassword,
      email
    ]);

    // Log status success
    debug(`User ${user.name} updated successfully`);

    // Return number of rows afected
    return changes;
  };
  /**************************************************************/

  /**************************************************************
   * Delete user by email
   @param {*} user User email
   @returns {*} Deleted user object w/o password
   */
  static deleteUserByEmail = async email => {
    // Check if user already exist in database
    const { user, db } = await this._checkUser({
      email,
      throwIfNotExist: true
    });

    // Delete user by email
    const changes = await db.delete(email);

    // Log status success
    debug(`User ${user.name} deleted successfully`);

    // Return number of deleted rows
    return changes;
  };
  /**************************************************************/

  /**************************************************************
   * Delete all users
   @returns {*} Number of deleted rows
   */
  static deleteAllUsers = async () => {
    // Database users object reference
    const db = await this._getDatabase();

    // Delete all users
    const changes = await db.deleteAll();

    // Log status success
    debug(`All users deleted successfully`);

    // Return number of deleted rows
    return changes;
  };
  /**************************************************************/

  /**************************************************************
   * Create new user
   @param {*} user User data
   @returns {*} User object w/o password
   */
  static registerNewUser = async ({
    email,
    name,
    lastname,
    username,
    password
  }) => {
    // Check if user already exist in database
    const { db } = await this._checkUser({
      email,
      throwIfExist: true
    });

    // Hash user password
    const hashedPassword = await EncryptService.hashPassword(password);

    // Inser user into database
    await db.insert([email, name, lastname, username, hashedPassword]);

    // Log status success
    debug(`User ${name} created successfully`);

    // Return user w/o password
    return { user: { email, name, lastname, username } };
  };
  /**************************************************************/

  /**************************************************************
   * Check user by email and password
   @param {*} user User email and password
   @returns {*} User object w/o password
   */
  static checkUserByEmailAndPassword = async ({ email, password }) => {
    // Check if user already exist in database
    const { user } = await this._checkUser({
      email,
      throwIfNotExist: true
    });

    // Exit if password do not match
    if (!(await EncryptService.comparePasswords(password, user.password)))
      // if (!(await bcrypt.compare(password, user.password)))
      throw new ErrorHandler(errorMessages.USER_PASSWORD_NOT_MATCH);

    // Log status success
    debug(`User ${user.name} credentials are valid`);

    // Return user w/o password
    return this._formatReturnUserPrivate(user);
  };
  /**************************************************************/
};
