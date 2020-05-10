/**
 * User controller
 */

// User services
const { DataService } = require('@api/services');

module.exports = class UserController {
  /**************************************************************
   * Select last N rows
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static selectLastNRows = async req => {
    const { n } = req.params;
    const data = await DataService.selectLastNRows(n);
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Select data between from and to params
   @param {*} data Client req (from, to)
   @returns {*} Response object and status code
   */
  static selectFromTo = async req => {
    const { from, to } = req.body;
    const data = await DataService.selectFromTo(from, to);
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Insert sensor data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static insertSensorData = async req => {
    const { arduino, co2, humidity, temperature } = req.body;
    const { changes } = await DataService.insertSensorData({
      arduino,
      co2,
      humidity,
      temperature
    });
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Delete all sensor data
   @returns {*} Response object and status code
   */
  static deleteAllSensorData = async () => {
    const { changes } = await DataService.deleteAllSensorData();
    return { changes };
  };
  /**************************************************************/
};
