const express = require("express");
const route = express.Router();

const {
  getSignup,
  emailCheck,
  checkUniqueName,
  signup,
} = require("../../controllers/authentication/signup");

const { sendOTP, verifyOTP } = require("../../others/otpSending");
const { refToken } = require("../../middleware/authentication");

route.get('/token', refToken)

route.get("/signup", getSignup);
route.post("/emailCheck", emailCheck);
route.post("/uniqueNameCheck", checkUniqueName);
route.post("/signup", signup);
route.post("/sendotp", refToken, sendOTP);
route.post("/verifyotp", refToken, verifyOTP);


module.exports = route;
