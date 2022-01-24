//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/users');
const JWT = require('../middlewares/authentication');
const upload = require('../middlewares/multer');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//---------------------------------//
// GET requests to the users route //
//---------------------------------//
router.get('/:id', [JWT.auth], Ctrl.readUser);
//--------------------------------//
// PUT request to the users route //
//--------------------------------//
router.put('/update/:id', upload.single('image'), [JWT.auth], Ctrl.updateUser);
//-----------------------------------//
// DELETE request to the users route //
//-----------------------------------//
router.delete('/delete/:id', [JWT.auth], Ctrl.deleteUser);
//-------------------//
// Export the router //
//-------------------//
module.exports = router;
