/**
 * Data service
 */

// Debug
const debug = new require('debug')('app:services:DataService');

// Config
const config = require('@api/config');

// Data service class
module.exports = class DataService {
  // Db path
  static dbDir = config.db.dbDirAlias;

  /**************************************************************
   * Insert sensor data into database
   @param {*} data Sensor data
   */
  static selectLastNRows = async n => {
    // Database data object reference
    const db = (await require(this.dbDir)).data;

    // Insert sensor data into datbase
    const data = await db.selectLastNRows([n]);
    console.log('DataService -> data', data);

    // Log status success
    debug('Sensor data retreived successfully');

    // Return number of rows affected
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Insert sensor data into database
   @param {*} data Sensor data
   */
  static insertSensorData = async ({ arduino, co2, humidity, temperature }) => {
    // Database data object reference
    const { data } = await require(this.dbDir);

    // Insert sensor data into datbase
    const { changes } = await data.insert([
      arduino,
      co2,
      humidity,
      temperature
    ]);

    // Log status success
    debug('Data from sensors inserted successfully');

    // Return number of rows affected
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Delete all data sensors from database
   */
  static deleteAllSensorData = async () => {
    // Database data object reference
    const { data } = await require(this.dbDir);

    // Insert sensor data into datbase
    const { changes } = await data.deleteAll();

    // Log status success
    debug('All sensors data deleted successfully');

    // Return number of rows affected
    return { changes };
  };
  /**************************************************************/
};
