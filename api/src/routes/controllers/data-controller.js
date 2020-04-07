/**
 * User controller
 */

// User services
const { DataService } = require('@api/services');

module.exports = class UserController {
  /**
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
    return { status: 201, data: { changes } };
  };
};
