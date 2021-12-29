//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const { authentication } = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//------------------------------------//
// POST request to the comments route //
//------------------------------------//
router.post('/', authentication, commentsCtrl.newComment);
//-----------------------------------//
// GET request to the comments route //
//-----------------------------------//
router.get('/:postId', commentsCtrl.comments);
//--------------------------------------//
// DELETE request to the comments route //
//--------------------------------------//
router.delete('/:commentId', authentication, commentsCtrl.deleteComment);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
