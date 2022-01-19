//----------------------------------//
// Imports the necessary dependency //
//----------------------------------//
const { Comments } = require('../models');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//--------------------------------------------------------------------------//
// If comment is equal to null or if there is no content in the resquest    //
// Return status 400 and the error message                                  //
// Else get the comment from the body of the request                        //
// Then return status 201 and the confirmation message                      //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.createComment = async (req, res) => {
  if (req.body.comment === null || !req.body.comment) {
    res.status(400).json({ message: 'Comment is required.' });
  } else {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment)
      .then((comment) => {
        res
          .status(201)
          .json({ message: 'Comment created with the ID ' + comment.id });
      })
      .catch((error) => {
        res.status(400).json({ error: 'An error has occurred. ' + error });
      });
  }
};
//-----------------------------------------------------------------------------------------------//
// Gets the postId from the params                                                               //
// Calls the sequelize function to find all comments of the comments table related to the postId //
// Returns the response                                                                          //
//-----------------------------------------------------------------------------------------------//
exports.readComment = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
};
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Look for the comment in the database by his id                           //
// Update comment with the body of the request indicating which by his id   //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.findOne({ where: { id: commentId } })
    .then(() => {
      Comments.update({ ...req.body }, { where: { id: commentId } });
      res
        .status(200)
        .json({ message: 'Comment ID ' + id + ' has been updated.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Look for the comment in the database by his id                           //
// Delete the comment indicating which by his id                            //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Comment ID ' + commentId + ' has been deleted.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
