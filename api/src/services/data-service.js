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
   * Retreive last N arduino sensor data rows from database
   @param {*} n Number of rows to retreive
   */
  static selectLastNRows = async n => {
    const db = (await require(this.dbDir)).data;
    const data = await db.selectLastNRows([n]);
    debug('Sensor data retreived successfully');
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Retreive arduino sensor data rows in range from database
   @param {*} from Starting date
   @param {*} to Ending date
   */
  static selectFromTo = async (from, to) => {
    const db = (await require(this.dbDir)).data;
    const data = await db.selectFromTo([from, to]);
    debug('Sensor data retreived successfully');
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Insert sensor data into database
   @param {*} data Sensor data
   */
  static insertSensorData = async ({ arduino, co2, humidity, temperature }) => {
    const db = (await require(this.dbDir)).data;

    const date = new Date().toISOString();

    // Add datetime stamp
    const data = [arduino, co2, humidity, temperature, date];
    const { changes } = await db.insert(data);

    debug('Data from sensors inserted successfully');
    return { changes, data: { arduino, co2, humidity, temperature, date } };
  };
  /**************************************************************/

  /**************************************************************
   * Delete all data sensors from database
   */
  static deleteAllSensorData = async () => {
    const { data } = await require(this.dbDir);
    const { changes } = await data.deleteAll();
    debug('All sensors data deleted successfully');
    return { changes };
  };
  /**************************************************************/
};
