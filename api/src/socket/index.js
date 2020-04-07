// Socket IO module

// Socket IO server
let io;

const createSocketIO = http => {
  io = require('socket.io')(http);

  io.on('connection', socket => {
    manageClients(true, socket);
    console.log('client connected');

    socket.on('disconnect', function() {
      manageClients(false, socket);
      console.log('client disconeccted');

      // io.emit('user disconnected');
    });
  });
};

module.exports = {
  createSocketIO
};
