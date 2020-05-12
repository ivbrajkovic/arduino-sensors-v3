/**
 * Read SQL file into an object
 */

const { join, basename, extname } = require('path');
const { readFileSync, readdirSync, statSync } = require('fs');

/**
 * Format SQL query
 * @param {*} str SQL query
 */
const trim = str => {
  const arr = {
    '( ': '(',
    ' )': ')'
  };
  return str
    .replace(/\r|\n/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/(\( )|( \))/g, (a, b) => arr[a]);
};

/**
 * Recursive function that read sql queries from all subdirectories
 * in specified root directory and save it in an object manteining
 * directory structures
 * @param {string} root Root search directory
 * @param {object} obj Object containing sql queries
 * @throws {object} error Error object
 */
const readSQL = root => {
  const queries = {};

  for (const path of readdirSync(root)) {
    // Get full path
    const fullPath = join(root, path);

    // Get path type
    const type = statSync(fullPath);

    // If path is a directory
    if (type.isDirectory()) {
      // Create new key with directory name
      queries[path] = readSQL(fullPath, queries[path]);
    }
    // If path is .sql file
    else if (type.isFile() && extname(path.toLowerCase()) === '.sql') {
      // Extract basename form path
      const base = basename(path, extname(path));
      // Add readed sql string to object key
      queries[base] = trim(readFileSync(fullPath, 'utf8'));
      // console.log('obj[base]', obj[base]);
    }
  }
  return queries;
};

/**
 * Async recursive function that read sql queries from all subdirectories
 * in specified root directory and save it in an object manteining
 * directory structures
 * @param {string} root Root search directory
 * @param {object} obj Object containing sql queries
 * @throws {object} obj Error object
 * @returns {object} obj Return promise
 */
const readSQLAsync = path => {
  return new Promise((resolve, reject) => {
    try {
      const obj = readSQL(path);
      resolve(obj);
    } catch (error) {
      reject(error);
    }
  });
};

/***************************************************
 * RedSQL class
 *
 * Object form parsing sql queries from files
 * manteining directory hierarhy in object
 * @constant {object} Object containing queries
 * @function {*} setParams Format query adding params
 ***************************************************/
class ReadSQL {
  constructor(queries) {
    this.queries = queries;
  }

  /**
   * Read SQL files from directories
   * @param {string} root Path to root directory
   */
  static read(root) {
    const queries = readSQL(root);
    return new ReadSQL(queries);
  }

  /**
   * Format query string with params
   * @param {string} query Query string readed from file
   * @param {array} params Array of query params
   * @returns {string} Return formated query or null
   */
  setParams(query, params) {
    if (typeof params === 'string') return query.replace(/%(\d+)/, params);
    else if (params instanceof Array)
      return query.replace(/%(\d+)/g, (_, n) => params[+n - 1]);
    return null;
  }

  /**
   * Print queries to console
   */
  print() {
    console.info(JSON.stringify(this.queries, null, '  '));
  }
}

module.exports = ReadSQL;
