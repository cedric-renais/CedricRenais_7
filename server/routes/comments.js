//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { authentication } = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------------------------------------//
// Adds a POST request to the comments route                    //
// Checks if the user is authenticated or not                   //
// Gets the comment including the username                      //
// Calls the sequelize function adds data to the comments table //
// Returns the comment data                                     //
//--------------------------------------------------------------//
router.post('/', authentication, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  const newComment = await Comments.create(comment);
  res.json(newComment);
});
//-----------------------------------------------------------------------------------------------//
// Adds a GET request to the comments route                                                      //
// Calls the sequelize function to find each data of the comments table associated with a postId //
// Returns the comments data                                                                     //
//-----------------------------------------------------------------------------------------------//
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(comments);
});
//----------------------------------------------------------------------------------//
// Adds a DELETE request to the comments route                                      //
// Gets the id of the comment                                                       //
// Calls the sequelize function to delete the specific data from the comments table //
//----------------------------------------------------------------------------------//
router.delete('/:commentId', authentication, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json('Comment deleted from the comments table.');
});
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
