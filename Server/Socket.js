const socketIO = require('socket.io');

let io;

function initSocketIO(server) {
  io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized.');
  }
  return io;
}

module.exports = { initSocketIO, getIO };