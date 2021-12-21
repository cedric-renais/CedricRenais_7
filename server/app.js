//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//-------------------//
// Importing routers //
//-------------------//
const postRouter = require('./routes/Posts');
const commentRouter = require('./routes/Comments');
const usersRouter = require('./routes/Users');
const likesRouter = require('./routes/Likes');
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
//----------------//
// Calling routes //
//----------------//
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/users', usersRouter);
app.use('/likes', likesRouter);
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
