//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const { verify } = require('jsonwebtoken');
require('dotenv').config();
//----------------------------------------//
// Checks if the user has a valid JWToken //
//----------------------------------------//
const authentication = (req, res, next) => {
  const JWToken = req.header('JWToken');

  if (!JWToken) return res.json({ error: 'User not logged in!' });

  try {
    const isValid = verify(JWToken, process.env.SECRET_TOKEN);

    if (isValid) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};
//---------------------------------//
// Exports authentication function //
//---------------------------------//
module.exports = { authentication };
