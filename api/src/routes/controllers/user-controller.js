/**
 * User controller
 */

// User services
const { UserService } = require('@api/services');

module.exports = class UserController {
  /**************************************************************
   * Get user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static getUser = async req => {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);

    // Return deleted user
    return { user };
  };
  /**************************************************************/

  /**************************************************************
   * Verify user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static verifyToken = async req => {
    const email = req.user?.email || '';
    const user = await UserService.getUserByEmail(email);

    // Return deleted user
    return { user };
  };
  /**************************************************************/

  /**************************************************************
   * Update user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static updateUserByEmail = async req => {
    const { email, name, lastname, nickname, password } = req.body;
    const changes = await UserService.updateUserByEmail({
      email,
      name,
      lastname,
      nickname,
      password
    });

    // Return deleted user
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Delete user
   @param {*} user Client req
   @returns {*} User token and status code
   */
  static deleteUser = async req => {
    const { email } = req.params;
    const changes = await UserService.deleteUserByEmail(email);

    // Return deleted user
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Delete all users
   @returns {*} Number of deleted rows
   */
  static deleteAllUsers = async () => {
    const changes = await UserService.deleteAllUsers();

    // Return deleted user
    return { changes };
  };
  /**************************************************************/
};
