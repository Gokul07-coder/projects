const express = require("express");
const app = express();
const env = require("dotenv").config({ path: "./util/.env" });
const db = require("./util/database");
const application = require("./app");
const cors = require("cors");

app.use(express.json());
app.use(application);
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Working on ${process.env.PORT}`);
});
