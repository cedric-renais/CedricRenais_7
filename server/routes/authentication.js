//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/users');
const JWT = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//-------------------------------------------//
// POST requests to the authentication route //
//-------------------------------------------//
router.post('/signup', Ctrl.register);
router.post('/signin', Ctrl.login);
//-----------------------------------------//
// GET request to the authentication route //
//-----------------------------------------//
router.get('/auth', [JWT.auth], Ctrl.auth);
