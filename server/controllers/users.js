//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });
//-------------------------------------------------------//
// Controllers (arranged in order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
// Get the username and the password from the body of the request                                                                       //
// Check if the username or the password are not missing in the request                                                                 //
// Check if the length of the username is between 3 and 15 characters                                                                   //
// Check if the password has at least one uppercase letter, one lowercase letter and one number and is between 6 and 18 characters long //
// Check if the username already exists in the Users tables                                                                             //
// If the username is not in the Users table                                                                                            //
// Hash password with bcrypt algorithm                                                                                                  //
// Add the user in the Users table by indicating by default that it is not admin                                                        //
// Then return status 201 with a message indicating the ID of the user                                                                  //
// If an error occurs, catch it and return status 500 with a basic error message                                                        //
// Else if the usersame is already exist return status 409 and the error message                                                        //
// If an error occurs, catch it and return status 500 with a basic error message                                                        //
//--------------------------------------------------------------------------------------------------------------------------------------//
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }
  if (username.length >= 16 || username.length <= 2) {
    return res
      .status(400)
      .json({ error: 'Username must be 3 - 15 characters long.' });
  }
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
  if (!regex.test(password)) {
    return res.status(400).json({
      error:
        'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number.',
    });
  }
  await Users.findOne({ where: { username: username } })
    .then((exist) => {
      if (!exist) {
        bcrypt.hash(password, 10).then((hash) => {
          Users.create({
            username: username,
            password: hash,
            admin: 0,
          })
            .then((user) => {
              return res
                .status(201)
                .json({ message: 'User created with the ID: ' + user.id });
            })
            .catch(() => {
              return res.status(500).json({ error: 'An error has occurred.' });
            });
        });
      } else {
        return res
          .status(409)
          .json({ error: 'Username ' + username + ' is already in use.' });
      }
    })
    .catch(() => {
      return res.status(500).json({ error: 'An error has occurred.' });
    });
};
//------------------------------------------------------------------------------------------------------------//
// Get the username and the password from the body of the request                                             //
// Check if the username or the password are not missing in the request                                       //
// Check if the username exist in the Users tables                                                            //
// If the user exist compare the password of the request with the user password                               //
// If the password match create JWTtoken containing the id, the admin status, the username and the secret key //
// Return status 200 with the token, the username and the user id                                             //
// Else if the password do not match, return status 403 with the error message                                //
// And Else return satus 404 with the error message                                                           //
// If an error occurs, catch it and return status 500 with a basic error message                              //
//------------------------------------------------------------------------------------------------------------//
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }
  await Users.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const JWToken = sign(
              { id: user.id, admin: user.admin, username: username },
              process.env.JWToken
            );
            return res
              .status(200)
              .json({ token: JWToken, username: username, id: user.id });
          } else {
            return res.status(403).json({ error: 'Invalid password.' });
          }
        });
      } else {
        return res
          .status(404)
          .json({ error: 'User ' + username + ' do not exist.' });
      }
    })
    .catch(() => {
      return res.status(500).json({ error: 'An error has occurred.' });
    });
};
//--------------------------------------------------------------------------------//
// Get the id from the params of the request                                      //
// Find user in the users table by is Primary Key by indicating attributes wanted //
// If the user exist return status 201 with the user info asked                   //
// Else return status 404 with the error message                                  //
// If an error occurs, catch it and return status 500 with a basic error message  //
//--------------------------------------------------------------------------------//
exports.profile = async (req, res) => {
  const id = req.params.id;
  await Users.findByPk(id, { attributes: ['username', 'biography'] })
    .then((user) => {
      if (user) {
        return res.status(201).json(user);
      } else {
        return res
          .status(404)
          .json({ error: 'User ID: ' + id + ' not found.' });
      }
    })
    .catch(() => {
      return res.status(500).json({ error: 'An error has occurred.' });
    });
};
//----------------------------------------------//
// To check if the user is authenticated or not //
//----------------------------------------------//
exports.auth = (req, res) => {
  res.json(req.user);
};
//---------------------------------------------------------------------------//
// Gets the password and the newPassword from the body                       //
// Find the correct user in the database                                     //
// Checks if the oldPassword word is the same as the user's current password //
// If the passwords do not match returns the error message                   //
// Otherwise hash the new password                                           //
// Calls the sequelize function to update the password                       //
// Returns the response                                                      //
//---------------------------------------------------------------------------//
exports.password = async (req, res) => {
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
};
//--------------------------------------------------------------------------------//
// Gets the id from the params                                                    //
// Calls the sequelize function to find user in the users table by is Primary Key //
// Calls the sequelize function to delete the user from the users table           //
// Returns the response                                                           //
//--------------------------------------------------------------------------------//
exports.profileDelete = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  Users.destroy({ where: { id: user.id } });
  res.json('User removed from the database.');
};
