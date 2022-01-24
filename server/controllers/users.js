//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
//-------------------------------------------------------//
// Controllers (arranged in order following the C.R.U.D) //
//-------------------------------------------------------//
//-----------------------------------------------------------------------------------//
// Get the id from the params of the request                                         //
// Look for user in the database with is Primary Key by indicating attributes wanted //
// If user exist return status 200 with the user info asked                          //
// IF user do not exist return status 404 and the error message                      //
// If an error occurs, catch it and return status 500 and the error message          //
//-----------------------------------------------------------------------------------//
exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: ['username', 'email', 'biography', 'image', 'isAdmin'],
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User ID ' + id + ' not found.' });
      } else res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send({ error: 'An error has occurred. ' + error });
  }
};
//-----------------------------------------------------------------------------------//
// Get the id from the params of the request                                         //
// Get the old password and new password from the body of the request                //
// Check if the user are enable to do this request                                   //
// If user is no enabled to do it return status 403 and the error message            //
// If oldPassword and newPassword are in the request                                 //
// Check if oldPassword match with user's current password                           //
// Look for user by his primary key in the database                                  //
// If password do not match return status 400 and the error message                  //
// Else hash newPassword, then update password in the database                       //
// If anything else has updated do it and return status 200 and confirmation message //
// If an error occurs, catch it and return status 500 and error                      //
//-----------------------------------------------------------------------------------//
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    let image;
    if ((oldPassword, newPassword)) {
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
      if (!PASSWORD_REGEX.test(newPassword)) {
        return res.status(400).json({
          error:
            'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number',
        });
      }
      await Users.findByPk(id);
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: id } });
      });
    }
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    await Users.update({ ...req.body, image: image }, { where: { id: id } });
    res.status(201).json({ message: 'User ID ' + id + ' updated.' });
  } catch (error) {
    res.status(500).send({ error: 'An error has occurred. ' + error });
  }
};
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Look for user in the database by is id                                   //
// If user exist delete user in the database                                //
// Return status 201 and confirmation message                               //
// Else return status 404 and the error message                             //
// If an error occurs, catch it and return status 500 and the error message //
//--------------------------------------------------------------------------//
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Users.destroy({ where: { id: id } })
    .then(() => res.status(200).json({ message: 'User deleted.' }))
    .catch((error) => res.status(400).json({ error }));
};
