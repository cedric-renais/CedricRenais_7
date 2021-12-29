//----------------------------------//
// Imports the necessary dependency //
//----------------------------------//
const { Comments } = require('../models');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//-------------------------------------------------------------------------//
// Gets the comment from the body                                          //
// Gets the username from the user                                         //
// Adds the username to the comment object                                 //
// Calls the sequelize function adds the new comment to the comments table //
// Returns the response                                                    //
//-------------------------------------------------------------------------//
exports.newComment = async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  const newComment = await Comments.create(comment);
  res.json(newComment);
};
//-----------------------------------------------------------------------------------------------//
// Gets the postId from the params                                                               //
// Calls the sequelize function to find all comments of the comments table related to the postId //
// Returns the response                                                                          //
//-----------------------------------------------------------------------------------------------//
exports.comments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
};
//----------------------------------------------------------------------------//
// Gets the commentId from the params                                         //
// Calls the sequelize function to delete the comment from the comments table //
// Returns the response                                                       //
//----------------------------------------------------------------------------//
exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json('Comment deleted from the comments table.');
};
