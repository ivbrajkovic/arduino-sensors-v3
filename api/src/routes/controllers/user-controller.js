/**
 * User controller
 */

// Config
const config = require('@api/config');

// User services
const { UserService } = require('@api/services');

module.exports = class UserController {
  /**
   * Get user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static getUser = async req => {
    const { email } = req.params;
    const { user } = await UserService.getUserByEmail({ email });

    // Return deleted user
    return { status: 200, data: { user } };
  };

  /**
   * Delete user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static deleteUser = async req => {
    const { email } = req.params;
    const { user } = await UserService.deleteUserByEmail({ email });

    // Return deleted user
    return { status: 200, data: { user } };
  };
};
