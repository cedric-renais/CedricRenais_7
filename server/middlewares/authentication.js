//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
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
//------------------------------------------//
// Declare constant containing the function //
//------------------------------------------//
const JWT = {
  auth: auth,
};
//------------------------------------//
// Export the authentication function //
//------------------------------------//
module.exports = JWT;
