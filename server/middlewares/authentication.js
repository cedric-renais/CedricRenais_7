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
  const GROUPOMANIA_TOKEN = req.header('GROUPOMANIA_TOKEN');
  if (!GROUPOMANIA_TOKEN) return res.json({ error: 'User not logged in.' });
  try {
    const isValid = verify(GROUPOMANIA_TOKEN, process.env.GROUPOMANIA_TOKEN);
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
