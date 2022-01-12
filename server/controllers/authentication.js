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
//---------------------------------------------------------------------------------------------------//
// Get the username, the email and the password from the body of the request                         //
// Create user by hashing the password with the bcrypt algorithm and add the user in the Users table //
// Return status 201 with a message indicating the ID of the user                                    //
// If an error occurs, catch it and return status 200 with the error                                 //
//---------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
// Get the username, the email and the password from the body of the request                                                            //
// Check if the username, the email or the password are not missing in the request                                                      //
// Check if the length of the username is between 3 and 15 characters                                                                   //
// Check if the email format is valid                                                                                                   //
// Check if the password has at least one uppercase letter, one lowercase letter and one number and is between 6 and 18 characters long //
// Check if the username already exists in the Users tables                                                                             //
// If the username is not in the Users table, hash the password with the bcrypt algorithm and add the user in the Users table           //                                                                                                      //
// Then return status 201 with a message indicating the ID of the user                                                                  //
// If an error occurs, catch it and return status 500 with the error message                                                            //
// Else if the usersame is already exist return status 409 and the error message                                                        //
// If an error occurs, catch it and return status 500 with the error message                                                            //
//--------------------------------------------------------------------------------------------------------------------------------------//
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (username == null || email == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  if (username.length >= 16 || username.length <= 2) {
    return res
      .status(400)
      .json({ error: 'Username must be 3 - 15 characters long' });
  }
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ error: 'Email is not valid(ex: email@email.com)' });
  }
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      error:
        'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number',
    });
  }
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res
        .status(409)
        .json({ error: 'Email ' + email + ' is already in use' });
    } else {
      Users.findOne({ where: { username: username } })
        .then((exist) => {
          if (!exist) {
            bcrypt.hash(password, 10).then((hash) => {
              Users.create({
                username: username,
                email: email,
                password: hash,
              })
                .then((user) => {
                  return res
                    .status(201)
                    .json({ message: 'User created with the ID ' + user.id });
                })
                .catch((error) => {
                  return res
                    .status(500)
                    .json({ error: 'An error has occurred ' + error });
                });
            });
          } else {
            return res
              .status(409)
              .json({ error: 'Username ' + username + ' is already in use' });
          }
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: 'An error has occurred ' + error });
        });
    }
  });
};
//------------------------------------------------------------------------------------------------------------//
// Get the email and the password from the body of the request                                                //
// Check if the email or the password are not missing in the request                                          //
// Find the user in the Users table by is email                                                               //
// If the user exist compare the password of the request with the user password                               //
// If the password match create JWTtoken containing the id, the admin status, the username and the secret key //
// Return status 200 with the token, the username and the user id                                             //
// Else if the password do not match, return status 403 with the error message                                //
// And Else return satus 404 with the error message                                                           //
// If an error occurs, catch it and return status 500 with a basic error message                              //
//------------------------------------------------------------------------------------------------------------//
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const JWToken = sign(
              {
                id: user.id,
                username: user.username,
                email: user.email,
                biography: user.biography,
                image: user.image,
                admin: user.IsAdmin,
              },
              process.env.SECRET_KEY
            );
            return res.status(200).json({
              token: JWToken,
              id: user.id,
              username: user.username,
              email: user.email,
              biography: user.biography,
              image: user.image,
              admin: user.IsAdmin,
            });
          } else {
            return res.status(403).json({ error: 'Invalid password.' });
          }
        });
      } else {
        return res.status(404).json({ error: email + ' do not exist.' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: 'An error has occurred. ' + error });
    });
};
//----------------------------------------------//
// To check if the user is authenticated or not //
//----------------------------------------------//
exports.auth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ error: 'No valid token found.' });
  }
};
