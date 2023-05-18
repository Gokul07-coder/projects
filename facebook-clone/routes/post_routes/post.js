let express = require("express");
let Router = express.Router();
const { refToken } = require("../../middleware/Authorization");
const { upload } = require("../../middleware/cloudinary");
const {
  getPost,
  upload_post,
} = require("../../controllers/post_controllers/post");
const {
  upload_story,
  get_story,
} = require("../../controllers/post_controllers/story");
const {
  savePost,
  removeSaved,
  getSaved,
} = require("../../controllers/post_controllers/savepost");

// get your own post

Router.get("/home/post", refToken, getPost);
Router.post("/home/post", refToken, upload.single("post"), upload_post);

Router.get("/home/story", refToken, get_story);
Router.post("/home/story", refToken, upload.single("story"), upload_story);

Router.get('/savepost', refToken, getSaved);
Router.post("/savepost", refToken, savePost);

//get story from friends
Router.delete("/savepost", refToken, removeSaved);

module.exports = Router;
