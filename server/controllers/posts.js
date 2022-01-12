//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { Posts, Likes, Comments } = require('../models');
const fs = require('fs');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//----------------------------------------------------------------------------//
// If title is equal to null or if there is no title in the resquest          //
// Return status 400 and error message                                        //
// If content is equal to null or if there is no content in the resquest      //
// Return status 400 and error message                                        //
// Else get post from body of the request                                     //
// Then return status 201 and confirmation message                            //
// If an error occurs, catch it and return status 400 and error message       //
//----------------------------------------------------------------------------//
exports.createPost = async (req, res) => {
  let image;
  if (req.body.content === null || !req.body.content) {
    res.status(400).json({ message: 'Content is required.' });
  } else {
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    post.image = image;
    await Posts.create(post)
      .then((post) => {
        res
          .status(201)
          .json({ message: 'Post created with the ID ' + post.id });
      })
      .catch((error) => {
        res.status(400).json({ error: 'An error has occurred. ' + error });
      });
  }
};
//-------------------------------------------------------------------------------//
// Find all the post in the posts tables including the Likes and Comments tables //
// Then return status 200 with all the data asked                                //
// If an error occurs, catch it and return status 400 and the error message      //
// Find all the like in the likes tables related to the users                    //
// Then return status 200 with all the data asked                                //
// If an error occurs, catch it and return status 400 and the error message      //
//-------------------------------------------------------------------------------//
exports.readAllPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes, Comments] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    res.status(400).json({ error: 'An error has occurred. ' + error });
  }
};
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Find one post of posts tables in the database                            //
// Then return status 200 and the post                                      //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.readOnePost = async (req, res) => {
  id = req.params.id;
  await Posts.findOne({ where: { id: id }, include: Comments })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
//--------------------------------------------------------------------------//
// Get the id from the params of the request                                //
// Look for the post in the database by his id                              //
// Update post with the body of the request indicating which by his id      //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
//-----------------------------------------------------------    -----------//
exports.updatePost = async (req, res) => {
  id = req.params.id;
  let image;
  if (req.file) {
    Posts.findOne({ where: { id: id } });
    image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
  }
  await Posts.findOne({ where: { id: id } })
    .then(() => {
      Posts.update({ ...req.body, image: image }, { where: { id: id } });
      res.status(200).json({ message: 'Post ID ' + id + ' has been updated.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
//--------------------------------------------------------------------------//
// Get  the id from the params of the request                               //
// Look for the post in the database by his id                              //
// Delete the post indicating which by his id                               //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
//--------------------------------------------------------------------------//
exports.deletePost = (req, res) => {
  id = req.params.id;
  Posts.findOne({ where: { id: id } })
    .then((posts) => {
      const filename = posts.image.split('/image/')[1];
      fs.unlink(`image/${filename}`, () => {
        Posts.destroy({ where: { id: id } })
          .then(() => res.status(200).json({ message: 'Post deleted.' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
