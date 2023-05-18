const express = require("express");
const app = express();
const env = require("dotenv").config({ path: "./Util/.env" });
app.use(express.json());
const index = require("./routes/auth");
const fb_post = require("./routes/post_routes/post");
const edit_profile = require("./routes/edit_profile/edit_profile");
const settings = require("./routes/edit_profile/edit_general");
const friend = require("./routes/friend_req/friend_req");
const group = require("./routes/group/group");
const home = require("./routes/homepage.js/homepage");
const message = require("./routes/message/message");
const search = require("./routes/search/search");
const cors = require("cors");
const reels = require("./routes/reels/reels");
const esearch = require("elasticsearch");
const bodyParser = require("body-parser");
const client = require("./Util/elasticsearch");
  const limiter  = require('express-rate-limit');

  const limit = limiter.rateLimit({
    windowMs : 10000,
    max : 2
  })

  app.use(limit);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Working");
  res.send({ message: "OK" }).status(200);
});

app.use(index);
app.use(fb_post);
app.use(edit_profile);
app.use(settings);
app.use(friend);
app.use(group);
app.use(home);
app.use(message);
app.use(search);
app.use(reels);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port : ${process.env.PORT}`);
});
