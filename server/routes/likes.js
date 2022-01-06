//------------------------------------//
// Imports the necessary dependencies //
//------------------------------------//
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/likes');
const JWT = require('../middlewares/authentication');
//---------------------------------//
// POST request to the likes route //
//---------------------------------//
router.post('/', [JWT.auth], Ctrl.likeOrNot);
//--------------------//
// Exports the router //
//--------------------//
module.exports = router;
