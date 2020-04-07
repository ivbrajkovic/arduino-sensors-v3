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
      ${sql.queries.table.users.create}
      ${sql.queries.table.data.create}
    `;
    return this.exec(queries);
  }

  data = {
    /**
     * Insert sensor data into table
     * @param {Array} params Sensor data
     */
    insert: params => {
      params.push(new Date().toISOString());
      // const query = sql.setParams(sql.queries.data.insert, params);
      return this.run(sql.queries.data.insert, params);
    }
  };

  users = {
    /**
     * Find user by email
     * @param {Array} params Sensor data
     */
    select: email => {
      return this.get(sql.queries.user.select, email);
    },

    /**
     * Insert new user database
     * @param {Array} params User data
     */
    insert: params => {
      params.push(new Date().toISOString());
      return this.run(sql.queries.user.insert, params);
    },

    /**
     * Insert new user database
     * @param {Array} params User data
     */
    delete: email => {
      return this.run(sql.queries.user.delete, email);
    }
  };
}

// Export database object reference
module.exports = new DB().open(config.db.dbPath);
