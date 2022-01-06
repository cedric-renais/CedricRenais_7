//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');
const JWT = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//------------------------------------//
// POST request to the comments route //
//------------------------------------//
router.post('/', [JWT.auth], Ctrl.createComment);
//-----------------------------------//
// PUT request to the comments route //
//-----------------------------------//
router.post('/update/:id', [JWT.auth], Ctrl.updateComment);
//--------------------------------------//
// DELETE request to the comments route //
//--------------------------------------//
router.delete('/delete/:id', [JWT.auth], Ctrl.deleteComment);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
