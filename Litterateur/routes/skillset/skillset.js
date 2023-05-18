const express = require("express");
const { refToken } = require("../../middleware/authentication");
const { updateSkillset, skillSet } = require("../../controllers/skillset/skillset");
const route = express.Router();

route.post("/skillset", refToken, skillSet);
route.patch("/skillset", refToken, updateSkillset )

module.exports = route;
