//----------------------------------//
// Imports the necessary dependency //
//----------------------------------//
const { Likes } = require('../models');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
// Gets the PostId from the body                                                              //
// Gets the UserId form ther user                                                             //
// Calls the sequelize function to find the like related to the PostId and the UserId         //
// If the like do not exist calls the sequelize function to adds the like to the Likes tables //
// Returns the response true                                                                  //
// Else calls the sequelize function to removes the like to the Likes tables                  //
// Returns the response false                                                                 //
//--------------------------------------------------------------------------------------------//
exports.likeOrNot = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const exist = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!exist) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false });
  }
};
