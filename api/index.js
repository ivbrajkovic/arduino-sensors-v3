/**
 * Application entry point
 */

// ! Set env variables, must be first
require('dotenv').config();

// ! Register aliases
require('module-alias/register');

// Debug
const debug = require('debug')('api:server');

// Configuration
const config = require('@api/config');

// Create server in socket module
const { server } = require('@api/socket');

// Wrap in async call because of async database module
(async () => {
  try {
    // Open database
    const db = await require('@db');
    debug('Database is open');

    // Create tables
    await db.createTables();
    debug('Tables are created');

    // Start listening
    server.listen(config.app.port, () =>
      console.log(`Server is listening at ${config.app.port}`)
    );
  } catch (error) {
    debug(`Server error: ${error}`);
    throw error;
  }
})();
