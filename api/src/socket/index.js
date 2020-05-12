/**
 * Socket IO
 */

// Debug
const debug = require('debug')('api:socketio');

const { ErrorHandler, errorMessages } = require('@api/errors');

// Express app
const app = require('@api/app');

// Create HTTP server because of SocketIO
const server = require('http').createServer(app);

// Auth service
const { AuthService } = require('@api/services');

// Socket IO server
const io = require('socket.io')(server);

// io.origins('*:*');

// Authentication middleware
// io.use(async (socket, next) => {
//   try {
//     const decoded = await AuthService.verifyJWT(socket.handshake);
//     debug(decoded);
//     next();
//   } catch (error) {
//     socket.emit('unauthorized');
//     //next(error);
//   }
// });

// io.use((socket, next) => console.log('next(): OK'));

const emitUnauthorized = (socket, error) => {
  debug(`Socket ${socket.id} is unauthorized`);
  socket.emit('unauthorized', error);
  socket.disconnect(true);
};

io.on('connection', async socket => {
  debug('client connected: ' + socket.id);

  let authenticated = false;
  let timeout = 3000;
  let timer;

  socket.emit('authenticate');
  timer = setTimeout(() => {
    !authenticated &&
      emitUnauthorized(socket, new ErrorHandler(errorMessages.JWT_TIMEOUT));
  }, timeout);

  socket.on('authenticate', async token => {
    debug(`Socket ${socket.id} token: ${token}`);
    try {
      // await AuthService.verifyJWT(socket.handshake);
      await AuthService.decodeJWT(token);
      authenticated = true;
      clearTimeout(timer);
    } catch (error) {
      debug('error', error);
      emitUnauthorized(socket, error);
    }
  });

  socket.on('disconnect', () => {
    debug(`Socket ${socket.id} is disconeccted`);
    clearTimeout(timer);
  });

  socket.on('error', error => {
    debug(`Socket ${socket.id} error: ${error}`);
    socket.disconnect(true);
    clearTimeout(timer);
  });
});

// Broadcast to clients
const broadcast = data => io.emit('data', data);

module.exports = { server, broadcast };
