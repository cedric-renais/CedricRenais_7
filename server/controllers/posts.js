//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const { Posts, Likes } = require('../models');
//-----------------------------------------------------------//
// Controllers (arranged in the order following the C.R.U.D) //
//-----------------------------------------------------------//
//----------------------------------------------------------------------//
// Gets the post from the body                                          //
// Adds the username and userId to the post                             //
// Calls the sequelize function to adds the new post to the posts table //
// Returns the response                                                 //
//----------------------------------------------------------------------//
exports.createPost = async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
};
//--------------------------------------------------------------------------------------------------//
// Calls the sequelize function to find all the post in the posts tables including the Likes tables //
// Calls the sequelize function to find all the data related to the UserId                          //
// Returns the responses                                                                            //
//--------------------------------------------------------------------------------------------------//
exports.readAllPosts = async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
};
//------------------------------------------------------------------------------------//
// Gets the id from the params                                                        //
// Calls the sequelize function to find the post of the posts table by is Primary Key //
// Returns the response                                                               //
//------------------------------------------------------------------------------------//
exports.readOnePost = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
};
//----------------------------------------------------------------------------------------------------//
// Gets the id from the params                                                                        //
// Calls the sequelize function to find all the data related to the UserId including the Likes tables //
// Returns the response                                                                               //
//----------------------------------------------------------------------------------------------------//
exports.readUsersPosts = async (req, res) => {
  const id = req.params.id;
  const posts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(posts);
};
//--------------------------------------------------------------//
// Gets the title to edit and the id from the body              //
// Calls the sequelize function to update the title of the post //
// Returns the response                                         //
//--------------------------------------------------------------//
exports.titleUpdate = async (req, res) => {
  const { editTitle, id } = req.body;
  await Posts.update({ title: editTitle }, { where: { id: id } });
  res.json(editTitle);
};
//----------------------------------------------------------------//
// Gets the message to edit and the id from the body              //
// Calls the sequelize function to update the message of the post //
// Returns the response                                           //
//----------------------------------------------------------------//
exports.messageUpdate = async (req, res) => {
  const { editMessage, id } = req.body;
  await Posts.update({ message: editMessage }, { where: { id: id } });
  res.json(editMessage);
};
//----------------------------------------------------------------------//
// Gets the postId from the body                                        //
// Calls the sequelize function to delete the post from the posts table //
// Returns the response                                                 //
//----------------------------------------------------------------------//
exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json('Data deleted from the posts table.');
};
