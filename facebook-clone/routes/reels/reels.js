const express   = require('express');
const { getReels, postReels } = require('../../controllers/reels/reels');
const { refToken } = require('../../middleware/Authorization');
const Router = express.Router();

Router.get('/reels',refToken, getReels)
Router.post('/reels',refToken, postReels)

module.exports = Router;