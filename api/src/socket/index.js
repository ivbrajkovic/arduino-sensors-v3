// Socket IO module

// Debug
const debug = new require('debug')('app:socketio');

// Express app
const app = require('@api/app');

// Create HTTP server because of SocketIO
const server = require('http').createServer(app);
// const server = require('http').createServer(app);

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

io.on('connection', async socket => {
  try {
    socket.emit('hello', 'Hello from server');

    // const decoded = await AuthService.verifyJWT(socket.handshake);
    debug('client connected: ' + socket.id);

    socket.on('disconnect', function () {
      debug('client disconeccted: ' + socket.id);

      // io.emit('user disconnected');
    });

    socket.on('data', function (data) {
      console.log('data', data);
      // debug('client: ' + data);

      // io.emit('user disconnected');
    });
  } catch (error) {
    //socket.emit('unauthorized');
    //next(error);
    socket.disconnect(true);
  }
});

const broadcast = data => {
  io.emit('data', data);
};

module.exports = { server, broadcast };
