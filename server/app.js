//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

//-------------------//
// Importing routers //
//-------------------//
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');
const likesRouter = require('./routes/likes');
//--------------------//
// Importing database //
//--------------------//
const { sequelize } = require('./models');
//------------------------------------//
// Calling the necessary dependencies //
//------------------------------------//
const app = express();
app.use(cors());
app.use(helmet());
//------------------------//
// Parse the JSON request //
//------------------------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//----------------//
// Calling routes //
//----------------//
app.use('/api/posts', postsRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/likes', likesRouter);
//------------------------------------------------------------------------------//
// Check the connection to the database and send the result back to the console //
//------------------------------------------------------------------------------//
const bdCheck = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
bdCheck();
//---------//
// Exports //
//---------//
module.exports = app;
