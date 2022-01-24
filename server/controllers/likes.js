//---------------------------------//
// Import the necessary dependency //
//---------------------------------//
const { Likes } = require('../models');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//---------------------------------------------------------------------------------------//
// Get the PostId from the body of the request and the UserId from the user              //
// Find the like related to the PostId and the UserId                                    //
// If the like do not exist add it to the Likes tables, return status 201 and liked true //
// If an error occurs, catch it and return status 400 and the error message              //
// Else remove the like to the Likes tables and return status 201 and liked false        //
// If an error occurs, catch it and return status 400 and the error message              //
//---------------------------------------------------------------------------------------//
exports.likeOrNot = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const exist = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!exist) {
    await Likes.create({ PostId: PostId, UserId: UserId })
      .then(() => {
        res.status(201).json({ liked: true });
      })
      .catch((error) => {
        res.status(400).json({ error: 'An error has occurred. ' + error });
      });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    })
      .then(() => {
        res.status(201).json({ liked: false });
      })
      .catch((error) => {
        res.status(400).json({ error: 'An error has occurred. ' + error });
      });
  }
};
