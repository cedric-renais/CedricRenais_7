//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');
const { authentication } = require('../middlewares/authentication');
//--------------------------------//
// POST request to the post route //
//--------------------------------//
router.post('/', authentication, likesCtrl.likeOrNot);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
