/**
 * Settings service
 */

// Debug
const debug = new require('debug')('api:services:SettingsService');

// Config
const config = require('@api/config');

// Format field object
const format = obj => [
  obj['arduino'],
  obj['led'],
  obj['fan'],
  obj['updateInterval'],
  JSON.stringify(obj['co2']),
  JSON.stringify(obj['humidity']),
  JSON.stringify(obj['temperature'])
];

// Data service class
module.exports = class SettingsService {
  // Db path
  static dbDir = config.db.dbDirAlias;

  /**************************************************************
   * PRIVATE METHODS
   **************************************************************/

  /**************************************************************
   * Insert or update settings into database
   @param {string} action Action
   @returns {object} settings
   */
  static _insertOrUpdate = async (action, settings) => {
    // Database settings object reference
    const db = (await require(this.dbDir)).settings;

    // Format settings object for db
    const formated = format(settings);

    let changes;

    if (action === 'insert')
      // Insert settings into datbase
      changes = (await db.insert(formated)).changes;
    else if (action === 'update') {
      // Shift arduion to last position because of "WHERE"
      // clausule in db query
      const first = formated.shift();
      formated.push(first);

      // Update settings into datbase
      changes = (await db.update(formated)).changes;
    }

    // Log status success
    debug('Data from sensors inserted successfully');

    // Return number of rows affected
    return changes;
  };

  /**************************************************************
   * PUBLIC METHODS
   **************************************************************/

  /**************************************************************
   * Get all arduino settings from database
   */
  static selectAll = async () => {
    const db = (await require(this.dbDir)).settings;
    const data = await db.selectAll();
    debug('Settings retreived successfully');
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Get all arduino namse from settings
   */
  static selectAllNames = async () => {
    const db = (await require(this.dbDir)).settings;
    const data = await db.selectAllNames();
    debug('Settings retreived successfully');
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Get arduino settings from database
   @param {*} data Arduino id
   */
  static select = async id => {
    const db = (await require(this.dbDir)).settings;
    const data = await db.select([id]);
    debug('Settings retreived successfully');
    return data;
  };
  /**************************************************************/

  /**************************************************************
   * Insert settings into database
   @param {*} settings settings
   */
  static insert = async settings => {
    const changes = await this._insertOrUpdate('insert', settings);
    debug('Settings inserted successfully');
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Update settings into database
   @param {*} settings settings
   */
  static update = async settings => {
    const changes = await this._insertOrUpdate('update', settings);
    debug('Settings updated successfully');
    return { changes };
  };
  /**************************************************************/
};
