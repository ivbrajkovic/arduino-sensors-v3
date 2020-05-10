/**
 * The main database module
 */

// SQLite async
const Database = require('sqlite-async');

// Configuration
const config = require('@api/config');

// Read query files in "./sql"
const sql = require('./utils/read-sql').read(__dirname + '/sql');

// Print sueries object if debug mode
config.db.debugSQL && sql.print();

/**
 * Custom database class inherited from sqlite-async module
 */
class DB extends Database {
  /**
   * Create tables
   * @returns {*} Promise
   */
  createTables() {
    const queries = `
      ${sql.queries.table.data}
      ${sql.queries.table.users}
      ${sql.queries.table.settings}
    `;
    return this.exec(queries);
  }

  /*********************************************************
   * USER
   *********************************************************/

  users = {
    /*********************************************************
     * Find user by email
     * @param {Array} params Sensor data
     */
    select: email => this.get(sql.queries.user.select, email),

    /*********************************************************
     * Insert new user into database
     * @param {Array} params User data
     */
    insert: params => {
      params.push(new Date().toISOString());
      return this.run(sql.queries.user.insert, params);
    },

    /*********************************************************
     * Update user into database
     * @param {Array} params User data
     */
    update: params => this.run(sql.queries.user.update, params),

    /*********************************************************
     * Delete user by email from database
     * @param {Array} params User data
     */
    delete: email => this.run(sql.queries.user.delete, email),

    /*********************************************************
     * Delete all users from database
     */
    deleteAll: () => this.run(sql.queries.user['delete-all'])
  };

  /*********************************************************
   * SETTINGS
   *********************************************************/

  settings = {
    select: id => this.get(sql.queries.settings.select, id),
    selectAll: () => this.all(sql.queries.settings['select-all']),
    selectAllNames: () => this.all(sql.queries.settings['select-all-names']),
    insert: settings => this.run(sql.queries.settings.insert, settings),
    update: settings => this.run(sql.queries.settings.update, settings)
  };

  /*********************************************************
   * DATA
   *********************************************************/

  data = {
    /*********************************************************
     * Insert sensor data into table
     * @param {Array} params Sensor data
     */
    insert: params => {
      params.push(new Date().toISOString());
      // const query = sql.setParams(sql.queries.data.insert, params);
      return this.run(sql.queries.data.insert, params);
    },

    /*********************************************************
     * Select last nth rows from sensor data
     * @param {Array} params Number of rows to select
     */
    selectLastNRows: params =>
      this.all(sql.queries.data['select-last-n-rows'], params),

    /*********************************************************
     * Select rows between dates
     * @param {Array} params Sensor data
     */
    selectFromTo: params =>
      this.all(sql.queries.data['select-from-to'], params),

    /*********************************************************
     * Delete all sensor data from database
     */
    deleteAll: () => this.run(sql.queries.data['delete-all'])
  };
}

// Export database object reference
module.exports = new DB().open(config.db.dbPath);
