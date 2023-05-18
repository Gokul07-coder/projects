const express = require("express");
const route = express.Router();
const db = require("../Util/database");
const bcrypt = require("bcrypt");
route.use(express.json());
const OTP = require("otp-generator");
const env = require("dotenv").config({ path: "../Util/.env" });
const jwt = require("jsonwebtoken");
const sendMail = require("./otp_signup");
const verify = require("./otp_verify_signup");
const { addition } = require("./elasticsearch/searching");

let signupRoute = (req, res) => {
  console.log("Signup for facebook");
  res.status(201).json({ message: "facebook signup goes here .." });
};

let signupPost = (req, res) => {
  try {
    // console.log("hello");
    // const emailNum = req.body.id;
    // const firstname = req.body.firstname;
    const email = req.body.email;
    console.log(email);

    // let result = firstdata.replace(/\d/g, "");
    // result = result ? "email" : "mobnum";

    db.query(
      "select email from account where email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("Error at db", err);
          res.status(401).json({ message: "Error occured" });
        } else if (result.length > 0) {
          console.log("Email already in use..");
          res.status(201).json("Email already used..");
        } else {
          if (req.body.email === req.body.confirmEmail) {
            console.log("ok to proceed");
            password();
            // mail(email,firstname);
          } else {
            console.log("Email and confirmEmail don't Match");
            res.status(201).json("Enter email correctly ..");
          }
        }
      }
    );

    async function password() {
      console.log("hrell");
      const { firstname, lastname, email, phone, dob, gender, password } =
        req.body;
      const hashPassword = await bcrypt.hash(password, 5);
      db.query(
        "INSERT INTO account (first_name,last_name,email,phone,password,dob,gender) VALUES (?,?,?,?,?,?,?)",
        [firstname, lastname, email, phone, hashPassword, dob, gender],
        (err) => {
          if (err) {
            console.log("error, ", err);
            res.status(401).json("Error occured at inserting");
          } else {
            console.log("User Information inserted successfully");
            console.log(email);
            db.query(
              "select id,first_name from account where email = ?",
              [email],
              (err, success) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(success);
                  let id = success[0].id;
                  let name = success[0].first_name;
                  console.log(id, name);
                  addition(id, name);
                }
              }
            );

            res.status(201).json({ message: " User information Inserted" });
          }
        }
      );
    }
  } catch {
    res.redirect("/signup");
    res.status(401).json({ message: "Error occured" });
  }
};

let get_otp = (req, res) => {
  res.status(201).json({ message: "Okay" });
  console.log("After OTP");
};

let send_otp = (req, res) => {
  const email = req.body.email;
  db.query(
    "Select first_name from account where email = ? ",
    [email],
    (err, resu) => {
      if (err) {
        console.log("error", err);
      } else {
        let firstname = resu[0].first_name;
        console.log("sending otp......");
        sendMail.sendMail(firstname, email);
        res.json({ message: "OTP sent successfully" });
      }
    }
  );
};

let verifyOTP = (req, res) => {
  try {
    email = req.body.email;
    user_otp = req.body.otp;
    db.query(
      "SELECT otp,email from OTP where email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("Error at ,", err);
        } else if (user_otp === result[0].otp) {
          verify.verify(email);
          res.json({ message: "Account verified successfully and created" });
        } else {
          console.log("User otp wrong and not verified");
          res.json({ message: "OTP wrong" });
        }
      }
    );
  } catch {
    console.log("Error at catch");
    res.status(401).json("Error at catch block");
  }
};

module.exports = { signupRoute, signupPost, get_otp, send_otp, verifyOTP };
