//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { authentication } = require('../middlewares/authentication');
require('dotenv').config();
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------------------------------------//
// Adds a POST request to the users route                       //
// Gets the username and the password from the body             //
// Hashs the password                                           //
// Calls the sequelize function to adds data to the users table //
//--------------------------------------------------------------//
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
    res.json('Data added to the users table.');
  });
});
//--------------------------------------------------------------------------------------//
// Adds a POST request to the users route                                               //
// Gets the username and the password from the body                                     //
// Calls the sequelize function to find the data in the users table                     //
// Checks if the username in the users table is the same of the username in the request //
// If the user are not in the users table, returns the error message                    //
// Or else if the user in the request exist, checks if the username and password match  //
// If the username and the password don't match, returns the error message              //
// Or else returns the token, the username and the user id                              //
//--------------------------------------------------------------------------------------//
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: 'User do not exist.' });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: 'User and password do not match.' });
    const GROUPOMANIA_TOKEN = sign(
      { username: user.username, id: user.id },
      process.env.GROUPOMANIA_TOKEN
    );
    res.json({ token: GROUPOMANIA_TOKEN, username: username, id: user.id });
  });
});
//--------------------------------------------------------------------------------//
// Adds a GET request to the users route to retrieve the user info                //
// Gets the id from the params                                                    //
// Calls the sequelize function to find user of the users table by is Primary Key //
// Adds attributes at the sequelize function to exclude some info of the request  //
//--------------------------------------------------------------------------------//
router.get('/info/:id', async (req, res) => {
  const id = req.params.id;
  const info = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  res.json(info);
});
//-------------------------------------------------------------------------------------//
// Adds a GET request to the users route to check if the user is authenticated or not  //
//-------------------------------------------------------------------------------------//
router.get('/auth', authentication, (req, res) => {
  res.json(req.user);
});
//-------------------------------------------------------------------------------//
// Adds a PUT request to the users route to update password form the users table //
// Gets the password and the newPassword from the body                           //
// Find the correct user in the database                                         //
//
//-------------------------------------------------------------------------------//
router.put('/password', authentication, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });
  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) res.json({ error: 'Password do not match.' });
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json('Password updated.');
    });
  });
});
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
