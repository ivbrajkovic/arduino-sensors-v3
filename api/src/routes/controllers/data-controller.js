/**
 * User controller
 */

// User services
const { DataService } = require('@api/services');

module.exports = class UserController {
  /**************************************************************
   * Insert sensor data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static selectLastNRows = async req => {
    // Get data from client request body
    const { n } = req.params;

    // Insert sensor data into datbase
    const data = await DataService.selectLastNRows(n);

    // Return status code and number of rows affected
    return { data };
  };
  /**************************************************************/

  /**************************************************************
   * Insert sensor data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static insertSensorData = async req => {
    // Get data from client request body
    const { arduino, co2, humidity, temperature } = req.body;

    // Insert sensor data into datbase
    const { changes } = await DataService.insertSensorData({
      arduino,
      co2,
      humidity,
      temperature
    });

    // Return status code and number of rows affected
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Delete all sensor data
   @returns {*} Response object and status code
   */
  static deleteAllSensorData = async () => {
    // Insert sensor data into datbase
    const { changes } = await DataService.deleteAllSensorData();

    // Return status code and number of rows affected
    return { changes };
  };
  /**************************************************************/
};
