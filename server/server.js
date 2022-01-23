//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
const http = require('http');
const app = require('./app');
const db = require('./models');
const { Users } = require('./models');
const bcrypt = require('bcrypt');
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
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};
//----------------------------------------------------------------------------//
// Automatic creation of an administrator account in the database users table //
//----------------------------------------------------------------------------//
/* function createAdmin() {
  Users.create({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    isAdmin: 1,
  });
} */
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
    //createAdmin();
  });
  server.listen(port);
});
