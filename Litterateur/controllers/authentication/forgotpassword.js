const forgotPasswordModel = require("../../model/authentication/forgotPasswordModel");
const loginModel = require("../../model/authentication/loginModel");
const { otpStoring } = require("../../model/authentication/otpModel");
const { generateOTP } = require("../../others/otpSending");
const { mail } = require("../../util/nodemailer");
const otpModel = require("../../model/authentication/otpModel");
const bcrypt = require("bcrypt");

const changePassword = (req, res) => {
  const email = req.body.email;
  loginModel.emailCheck(email, null, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
    } else if (result == "User not found") {
      res.status(200).json({ message: "This email is not valid" });
    } else {
      const otp = generateOTP();
      mail(email, otp);
      otpStoring(result[0].id, otp, (error, resu) => {
        if (error) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(200).json({
            message: `Mail sent successfully to ${email}, ${result[0].id}`,
          });
        }
      });
    }
  });
};

//otp from user and id from state of react component

const checkOTP = async (req, res) => {
  const { otp, id, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 7);
  otpModel.getOTP(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error at verifying" });
    } else {
      if (+result[0].otp == +otp) {
        otpModel.deleteOTP(id, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Error at deleting" });
          } else {
            console.log("Deletion successful");
            forgotPasswordModel.updatePassword(
              id,
              hashPassword,
              (err, result) => {
                if (err) {
                  res.status(500).json({ error: "Error at updating password" });
                } else {
                  res
                    .status(200)
                    .json({ message: "Password updated successfully" });
                }
              }
            );
          }
        });
      } else {
        res.status(200).json({ error: "Enter correct OTP" });
      }
    }
  });
};

module.exports = { changePassword, checkOTP };
