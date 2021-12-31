//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { verify } = require('jsonwebtoken');
require('dotenv').config();
//----------------------------------------------------------------------------------------------------//
// Creates authentication function to check if the user has a valid token or not                      //
// If the token is valid returns the next function but if the token are not returns the error message //
//----------------------------------------------------------------------------------------------------//
const authentication = (req, res, next) => {
  const JWToken = req.header('JWToken');
  if (!JWToken) return res.json({ error: 'User not logged in.' });
  try {
    const isValid = verify(JWToken, process.env.JWToken);
    req.user = isValid;
    if (isValid) return next();
  } catch (error) {
    return res.json({ error: error });
  }
};
//-------------------------------------//
// Exports the authentication function //
//-------------------------------------//
module.exports = { authentication };
