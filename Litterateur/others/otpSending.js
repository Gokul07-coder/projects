// const signupModel = require("../model/authentication/signupModel");
const otpModel = require("../model/authentication/otpModel");
const { mail } = require("../util/nodemailer");
const { accountVerification } = require("../others/accountVerification");

const sendOTP = (req, res) => {
  const email = req.body.email;
  const { id } = req.user;
  const OTP = generateOTP();
  otpModel.otpStoring(id, +OTP, (error, result1) => {
    if (error) {
      res.status(500).json({ error: "Error" });
    } else {
      mail(email, OTP);
      res.status(201).json({ message: `${id}` });
    }
  });
};

const verifyOTP = (req, res) => {
  const { id } = req.user;
  const { OTP } = req.body;
  otpModel.getOTP(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error at verifying" });
    } else {
      if (+result[0].otp == +OTP) {
        otpModel.deleteOTP(id, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Deletion successful");
            accountVerification(id, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("ok Verified in database");
              }
            });
          }
        });
        res.status(200).json({ message: "verified" });
      } else {
        res.status(200).json({ error: "Enter correct OTP" });
      }
    }
  });
};

function generateOTP() {
  let num = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += num[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = { sendOTP, verifyOTP, generateOTP };
