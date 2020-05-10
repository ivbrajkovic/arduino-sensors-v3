/**
 * Settings controller
 */

// Settings services
const { SettingsService } = require('@api/services');

module.exports = class SettingsController {
  /**************************************************************
   * Select all settings
   @returns {*} Response object and status code
   */
  static selectAll = async () => {
    const data = await SettingsService.selectAll();
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Select all arduino names from settings
   @returns {*} Response object and status code
   */
  static selectAllNames = async () => {
    const data = await SettingsService.selectAllNames();
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Select setting by arduino id
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static select = async ({ params }) => {
    const data = await SettingsService.select(params.id);
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Insert settings
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static insert = async ({ body }) => {
    const data = await SettingsService.insert({ ...body });
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Update settings
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static update = async ({ body }) => {
    const data = await SettingsService.update({ ...body });
    return { data };
  };
  /**************************************************************/
};
