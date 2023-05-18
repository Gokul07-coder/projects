const express = require("express");
const route = express.Router();

const { login } = require("../../controllers/authentication/login");
const {
  changePassword, checkOTP,
} = require("../../controllers/authentication/forgotpassword");

route.post("/login", login);
route.post("/forgotPassword", changePassword);
route.post("/checkOTP", checkOTP);

module.exports = route;
