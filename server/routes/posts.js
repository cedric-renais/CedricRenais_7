//--------------------------------------//
// Importing the necessary dependencies //
//--------------------------------------//
const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
//----------------//
// Create routers //
//----------------//
router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});
router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});
//-----------------//
// Exports routers //
//-----------------//
module.exports = router;
