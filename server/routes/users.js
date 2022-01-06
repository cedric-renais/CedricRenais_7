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
//---------------------------------//
// GET requests to the users route //
//---------------------------------//
router.get('/profile/:id', [JWT.auth], Ctrl.readUser);
//--------------------------------//
// PUT request to the users route //
//--------------------------------//
router.put('/profile/update/:id', [JWT.auth], Ctrl.updateUser);
//-----------------------------------//
// DELETE request to the users route //
//-----------------------------------//
router.delete('/profile/delete/:id', [JWT.auth], Ctrl.deleteUser);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
