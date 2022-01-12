//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/authentication');
const JWT = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//-------------------------------------------//
// POST requests to the authentication route //
//-------------------------------------------//
router.post('/signup', Ctrl.signup);
router.post('/signin', Ctrl.signin);
//-----------------------------------------//
// GET request to the authentication route //
//-----------------------------------------//
router.get('/auth', [JWT.auth], Ctrl.auth);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
