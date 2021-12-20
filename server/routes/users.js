//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { authentication } = require('../middlewares/authentication');
require('dotenv').config();
//----------------------//
// Create routers       //
// 1) Register route    //
// 2) Login route       //
// 3) Check token route //
//----------------------//
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json('User created');
  });
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "User doesn't exist" });
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: 'Wrong username and password combination' });
    const JWToken = sign(
      { username: user.username, id: user.id },
      process.env.SECRET_TOKEN
    );
    res.json(JWToken);
  });
});
router.get('/auth', authentication, (req, res) => {
  res.json(req.user);
});
//-----------------//
// Exports routers //
//-----------------//
module.exports = router;
