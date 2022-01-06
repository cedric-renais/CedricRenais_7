//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { Users } = require('../models');
const bcrypt = require('bcrypt');
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
    await Users.findByPk(id, {
      attributes: ['username', 'email', 'biography', 'avatar'],
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(404).json({ error: 'User ID ' + id + ' not found.' });
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
// Else hash newPassword, then update password in the database                       //                               //
// If anything else has updated do it and return status 200 and confirmation message //                    //
// If an error occurs, catch it and return status 500 and error                      //
//-----------------------------------------------------------------------------------//
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    if (req.body.isAdmin === true) {
      res.status(403).json({ error: 'Forbidden.' });
    }
    if ((oldPassword, newPassword)) {
      const user = await Users.findByPk(id);
      bcrypt.compare(oldPassword, user.password).then((match) => {
        if (!match) {
          res.status(401).json({ error: 'Password do not match.' });
        } else {
          bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({ password: hash }, { where: { id: id } });
          });
        }
      });
    }
    await Users.update({ ...req.body }, { where: { id: id } });
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
  try {
    const id = req.params.id;
    Users.findOne({ where: { id: id } }).then((user) => {
      user.destroy({ where: { id: req.params.id } });
    });
    res.status(200).json({ message: 'User ID ' + id + ' deleted.' });
  } catch (error) {
    res.status(500).send(error);
  }
};
