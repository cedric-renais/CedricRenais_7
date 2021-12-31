//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts_Ctrl');
const { authentication } = require('../middlewares/authentication');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------//
// POST request to the post route //
//--------------------------------//
router.post('/', authentication, postsCtrl.newPost);
//--------------------------------//
// GET requests to the post route //
//--------------------------------//
router.get('/', authentication, postsCtrl.posts);
router.get('/post/:id', postsCtrl.post);
router.get('/user/:id', postsCtrl.userPosts);
//--------------------------------//
// PUT request to the posts route //
//--------------------------------//
router.put('/title', authentication, postsCtrl.titleUpdate);
router.put('/message', authentication, postsCtrl.messageUpdate);
//-----------------------------------//
// DELETE request to the posts route //
//-----------------------------------//
router.delete('/:postId', authentication, postsCtrl.deletePost);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
