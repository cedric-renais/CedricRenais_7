//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const { authentication } = require('../middlewares/authentication');
const multer = require('../middlewares/multer');
//-------------------------------------------------------//
// Routers (arranged in the order following the C.R.U.D) //
//-------------------------------------------------------//
//--------------------------------//
// POST request to the post route //
//--------------------------------//
router.post('/', authentication, multer, postsCtrl.createPost);
//--------------------------------//
// GET requests to the post route //
//--------------------------------//
router.get('/', authentication, postsCtrl.readAllPosts);
router.get('/:id', authentication, postsCtrl.readOnePost);
router.get('/users/:id', authentication, postsCtrl.readUsersPosts);
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
