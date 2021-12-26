//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { authentication } = require('../middlewares/authentication');
//---------------------------------------------------------------------------------------------------//
// Adds a POST request to the post route                                                             //
// Gets the PostId and the UserId                                                                    //
// Checks if the data in the Likes table already exist by calling the sequelize function to find it  //
// If data do not exist calls the sequelize function to adds it and returns the Liked status to true //
// Else calls the sequelize function to remove it and returns the Liked status to false              //
//---------------------------------------------------------------------------------------------------//
router.post('/', authentication, async (req, res) => {
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
});
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
