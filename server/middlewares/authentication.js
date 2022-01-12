//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { verify } = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });
//--------------------------------------------------------------//
// Get token from the header of the request                     //
// If no token, return a 403 status and the error               //
// Using the JWT verify function to check if the token is valid //
// If error, return 401 status and the error message            //
// Otherwise go to next function                                //
//--------------------------------------------------------------//
auth = (req, res, next) => {
  try {
    const JWToken = req.header('JWToken');
    if (!JWToken) {
      return res.status(403).json({ error: 'User not logged in.' });
    } else {
      const user = verify(JWToken, process.env.SECRET_KEY);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: 'An error has occurred. ' + error });
  }
};
//--------------------------------------------------------//
// Look for the user in the database by his primary key   //
// If the user isAdmin is set to true go to next function //
// Otherwise return status 403 and the error message      //
//--------------------------------------------------------//
admin = (req, res, next) => {
  User.findByPk(req.user).then((user) => {
    if (user.isAdmin === true) {
      next();
      return;
    }
    res.status(403).json({ error: 'Requires an admin role.' });
    return;
  });
};
//-----------------------------------------------//
// Declararing constant containing the functions //
//-----------------------------------------------//
const JWT = {
  auth: auth,
  admin: admin,
};
//-------------------------------------//
// Exports the authentication function //
//-------------------------------------//
module.exports = JWT;
