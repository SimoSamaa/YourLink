let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: '*',
        method: [ 'GET', 'POST', 'PUT', 'DELETE' ]
      }
    });

    return io;
  },
  getIo: () => {
    if(!io) throw new Error('Socket.io not initailized');
    return io;
  }
};