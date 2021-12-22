//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { authentication } = require('../middlewares/authentication');
//----------------//
// Create routers //
//----------------//
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
//-----------------//
// Exports routers //
//-----------------//
module.exports = router;
