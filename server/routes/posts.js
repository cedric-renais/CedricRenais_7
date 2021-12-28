//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { authentication } = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------------------------------------//
// Adds a POST request to the post route                        //
// Gets the post data from the body                             //
// Adds the username and userId elements to the post object     //
// Calls the sequelize function to adds data to the posts table //
// Returns the post data                                        //
//--------------------------------------------------------------//
router.post('/', authentication, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});
//---------------------------------------------------------------------------------------------//
// Adds a GET request to the post route                                                        //
// Calls the sequelize function to find each data of the posts table including the Likes table //
// Returns each post data                                                                      //
//---------------------------------------------------------------------------------------------//
router.get('/', authentication, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});
//--------------------------------------------------------------------------------//
// Adds a GET request to the post route                                           //
// Gets the id from the params                                                    //
// Calls the sequelize function to find data of the posts table by is Primary Key //
// Returns the post data                                                          //
//--------------------------------------------------------------------------------//
router.get('/post/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});
//-------------------------------------------------------------------------//
// Adds a GET request to the post route                                    //
// Gets the id from the params                                             //
// Calls the sequelize function to find all the data related to the UserId //
// Including the Likes table                                               //
// Returns the posts data                                                  //
//-------------------------------------------------------------------------//
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const posts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(posts);
});
//----------------------------------------------------------------------------//
// Adds a PUT request to the posts route                                      //
// Gets the editTitle and the id from the body                                //
// Calls the sequelize function to update a specific field of a specific post //
//----------------------------------------------------------------------------//
router.put('/title', authentication, async (req, res) => {
  const { editTitle, id } = req.body;
  await Posts.update({ title: editTitle }, { where: { id: id } });
  res.json(editTitle);
});
//----------------------------------------------------------------------------//
// Adds a PUT request to the posts route                                      //
// Gets the editMessage and the id from the body                              //
// Calls the sequelize function to update a specific field of a specific post //
//----------------------------------------------------------------------------//
router.put('/message', authentication, async (req, res) => {
  const { editMessage, id } = req.body;
  await Posts.update({ message: editMessage }, { where: { id: id } });
  res.json(editMessage);
});
//-------------------------------------------------------------------------------//
// Adds a DELETE request to the posts route                                      //
// Calls the sequelize function to delete the specific data from the posts table //
//-------------------------------------------------------------------------------//
router.delete('/:postId', authentication, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json('Data deleted from the posts table.');
});
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
