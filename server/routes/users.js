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
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
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
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) res.json({ error: "User doesn't exist." });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "User and password don't match." });
    const GROUPOMANIA_TOKEN = sign(
      { username: user.username, id: user.id },
      process.env.GROUPOMANIA_TOKEN
    );
    res.json({ token: GROUPOMANIA_TOKEN, username: username, id: user.id });
  });
});
//-------------------------------------------------------------------------------------//
// Adds a GET request to the users route to Check if the user is authenticated or not  //
//-------------------------------------------------------------------------------------//
router.get('/auth', authentication, (req, res) => {
  res.json(req.user);
});
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
