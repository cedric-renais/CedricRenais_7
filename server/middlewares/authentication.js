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
  const JWToken = req.header('JWToken');
  if (!JWToken) {
    return res.status(403).json({ error: 'User not logged in.' });
  } else {
    const isValid = verify(JWToken, process.env.JWToken);
    if (error) {
      return res.status(401).json({ error: 'Unauthorized. ' + error });
    }
    req.user = isValid;
    next();
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
