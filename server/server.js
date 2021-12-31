//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
const http = require('http');
const app = require('./app');
const db = require('./models');
require('dotenv').config({ path: './config/.env' });
//-------------------------------------------//
// Returns a valid port (number or a string) //
//-------------------------------------------//
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8800');
app.set('port', port);
//----------------------------------------------------------------//
// Searches for the various errors and handles them appropriately //
//----------------------------------------------------------------//
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//---------------------------------------------------------------------------------------------//
// Creation of the server with database synchronization                                        //
// An event listener indicating the port or named pipe the server is running on in the console //
//---------------------------------------------------------------------------------------------//
const server = http.createServer(app);
db.sequelize.sync().then(() => {
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind =
      typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  server.listen(port);
});
