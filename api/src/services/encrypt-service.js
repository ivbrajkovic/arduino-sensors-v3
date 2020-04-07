/**
 * Encryption service
 */

// Node bcrypt
const bcrypt = require('bcrypt');

// Config
const config = require('@api/config');

// Encryption class
module.exports = class EncryptService {
  /**
   * Salt for bcrypt
   */
  static salt = +config.app.bcryptSalt;

  /**
   * Hash password
   @param {string} password Password
   @return {string} Hashed pasword
   */
  static hashPassword = async password =>
    await bcrypt.hash(password, this.salt);

  /**
   * Compare passwords
   @param {string} password Password
   @param {string} hasedPassword Hashed password
   */
  static comparePasswords = async (password, hasedPassword) =>
    await bcrypt.compare(password, hasedPassword);
};
