const express = require("express");
const { addSocialProfile, updateSocialProfile } = require("../../controllers/social_media/socialMedia");
const { refToken } = require("../../middleware/authentication");
const route = express.Router();

route.post('/social', refToken, addSocialProfile);
route.put("/social", refToken, updateSocialProfile);

module.exports = route;