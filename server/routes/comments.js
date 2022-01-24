//-----------------------------------//
// Import the necessary dependencies //
//-----------------------------------//
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
// GET request to the comments route //
//-----------------------------------//
router.get('/:postId', [JWT.auth], Ctrl.readComment);
//-----------------------------------//
// PUT request to the comments route //
//-----------------------------------//
router.put('/update/:commentId', [JWT.auth], Ctrl.updateComment);
//--------------------------------------//
// DELETE request to the comments route //
//--------------------------------------//
router.delete('/delete/:commentId', [JWT.auth], Ctrl.deleteComment);
//-------------------//
// Export the router //
//-------------------//
module.exports = router;
