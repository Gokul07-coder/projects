const signupModel = require("../../model/authentication/signupModel");
const bcrypt = require("bcrypt");
const token = require("../../others/tokenGeneration");

const getSignup = (req, res) => {
  console.log("Signup goes here");
};

const emailCheck = (req, res) => {
  const email = req.body.email;
  console.log(email);
  signupModel.checkEmail(email, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error checking email" });
    } else {
      res.status(201).json({ message: result });
    }
  });
};

const checkUniqueName = (req, res) => {
  const uniqueName = req.body.uniqueName;
  signupModel.uniqueNameCheck(uniqueName, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error checking uniqueName" });
    } else {
      res.status(201).json({ message: result });
    }
  });
};


const signup = async (req, res) => {
  const { name, email, dob, gender, password } = req.body;
  console.log(name, email, dob, gender, password);
  console.log(process.env.SALT);
  const hashPassword = await bcrypt.hash(password, 7);
  console.log(hashPassword);
  signupModel.createAccount(
    name,
    email,
    dob,
    gender,
    hashPassword,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error creating account" });
      } else {
        signupModel.getId(email, (err, result1) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Token Generating" });
          } else {
            const id = result1[0].id;
            var tok = token.tokenGenerate(id);
            signupModel.tokenInsertion(id, tok, (err, result2) => {
              if (err) {
                console.log("Error at inserting token");
              } else {
                console.log("success at token insertion");
                res.status(201).json({ message: tok });
              }
            });
          }
        });
      }
    }
  );
};

module.exports = { getSignup, emailCheck, checkUniqueName, signup };
