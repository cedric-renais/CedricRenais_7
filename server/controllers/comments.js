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
  if (req.body.content === null || !req.body.content) {
    res.status(400).json({ message: 'Content is required.' });
  } else {
    const comment = req.body;
    comment.username = req.user.username;
    comment.PostId = req.params.id;
    comment.UserId = req.user.id;
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
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Look for the comment in the database by his id                           //
// Update comment with the body of the request indicating which by his id   //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.updateComment = async (req, res) => {
  id = req.params.id;
  await Comments.findOne({ where: { id: id } })
    .then(() => {
      Comments.update({ ...req.body }, { where: { id: id } });
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
  id = req.params.id;
  await Comments.findOne({ where: { id: id } })
    .then(() => {
      Comments.destroy({ where: { id: id } });
    })
    .then(() =>
      res
        .status(200)
        .json({ message: 'Comment ID ' + id + ' has been deleted.' })
    )
    .catch((error) =>
      res.status(400).json({ error: 'An error has occurred. ' + error })
    );
};
