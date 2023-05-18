const db = require("../Util/database");
const express = require("express");
const { Router } = require("express");
const route = Router();
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const { resume } = require("../Util/database");
route.use(express.json());
const jwt = require("jsonwebtoken");

var loginRoute = (req, res) => {
  console.log("Login page");
  res.json({ message: "Loginpage ...." });
};

var loginPost = (req, res) => {
  // console.log("okkkkkkkkkkkkkkk");

  const Email = req.body.email;
  console.log(Email);
  db.query(
    "SELECT email from account where email = ? ",
    [Email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else if (result.length > 0) {
        console.log("User found");

        db.query(
          "Select password as checkPassword from account where email = ?",
          [Email],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "Server error" });
            } else if (result.length > 0) {
              console.log("res ", result.length);

              async function checking() {
                try {
                  const hashpass = await bcrypt.hash(req.body.password, 5);
                  // console.log(req.body.password);
                  if (
                    await bcrypt.compare(
                      req.body.password,
                      result[0].checkPassword
                    )
                  ) {
                    db.query(
                      "select * from account where email = ?",
                      [Email],
                      (err, result) => {
                        if (err) {
                          console.log("error", err);
                          res.status(500).json({ message: "Server error" });
                        } else {
                          const token = jwt.sign(
                            { user_id: result[0].id, Email },
                            "secret",
                            {
                              expiresIn: "1d",
                            }
                          );
                          console.log("token generated : ", token);
                          db.query(
                            "update account set token = ? where email = ?",
                            [token, Email],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                res
                                  .status(500)
                                  .json({ message: "Server error" });
                              } else {
                                console.log("Token stored");
                                res.status(201).json({ message: `${token}` });
                              }
                            }
                          );
                        }
                      }
                    );
                    console.log("success you are an signed up user");
                    // res.json({ message: `${token} ok` });
                  } else {
                    console.log("Password Wrong");
                    res.json({ message: "Password wrong" });
                  }
                } catch (e) {
                  console.log(e);
                  res.status(500).json({ message: "Server error" });
                }
              }
              checking();
            } else {
              console.log("Password wrong ...");
              res.json({ message: "Password wrong" });
            }
          }
        );
      } else {
        console.log("User doesn't exist just signup yourself");
        res.status(404).json("email wrong ...");
      }
    }
  );
};

module.exports = { loginPost, loginRoute };
