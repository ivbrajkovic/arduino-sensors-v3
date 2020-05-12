/**
 * Socket IO
 */

// Debug
const debug = require('debug')('api:socketio');

// Auth service
const { AuthService } = require('@api/services');

// Error handlers
const { ErrorHandler, errorMessages } = require('@api/errors');

// Express app
const app = require('@api/app');

// Create HTTP server because of SocketIO
const server = require('http').createServer(app);

// Socket IO server
const io = require('socket.io')(server);

// Cors origin
// io.origins('*:*');

const emitUnauthorized = (socket, error) => {
  debug(`Socket ${socket.id} is unauthorized`);
  socket.emit('unauthorized', error);
  socket.disconnect(true);
};

// On client connected
io.on('connection', async socket => {
  debug('client connected: ' + socket.id);

  let authenticated = false;
  let timeout = 3000;
  let timer;

  // Sent authenticate recquest
  socket.emit('authenticate');
  timer = setTimeout(() => {
    !authenticated &&
      // Authentication timeout
      emitUnauthorized(socket, new ErrorHandler(errorMessages.JWT_TIMEOUT));
  }, timeout);

  // On token received from client
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

  // On client diconected
  socket.on('disconnect', () => {
    debug(`Socket ${socket.id} is disconeccted`);
    clearTimeout(timer);
  });

  // On client error
  socket.on('error', error => {
    debug(`Socket ${socket.id} error: ${error}`);
    socket.disconnect(true);
    clearTimeout(timer);
  });
});

// Broadcast to clients
const broadcast = data => io.emit('data', data);

module.exports = { server, broadcast };
