/**
 * Database configuration
 */

// App utility module
const { env } = require('@api/utils');

module.exports = {
  debugSQL: env('DEBUG_SQL', false),
  dbDir: env('DB_DIR', 'db'),
  dbDirAlias: env('DB_DIR_ALIAS', '@db'),
  dbPath: env('DB_PATH', 'db/database.db')
};
