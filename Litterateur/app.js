const express = require('express');
const route = express.Router();
const signup = require('./routes/authentication/signup');
const login = require('./routes/authentication/login');
const skillset = require('./routes/skillset/skillset');
const socialmedia = require('./routes/social_media/socialMedia');

route.use(signup);
route.use(login);
route.use(skillset);
route.use(socialmedia);

module.exports = route;