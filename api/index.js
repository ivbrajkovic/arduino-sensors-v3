/**
 * Application entry point
 */

// ! Set env variables, must be first
require('dotenv').config();

// ! Register aliases
require('module-alias/register');

// Debug
const debug = new require('debug')('app:server');

// Configuration
const config = require('@api/config');

// Express app
// const app = require('@api/app');

// Create HTTP server because of SocketIO
// const server = require('http').createServer(app);

// Create socketIO
// require('@api/socket').createSocketIO(server);

const { server, broadcast } = require('@api/socket');

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

    // setInterval(() => {
    //   broadcast({ data: new Date().toTimeString() });
    //   console.log('broadcast:', new Date().toTimeString());
    // }, 5000);
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
