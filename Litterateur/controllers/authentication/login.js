const loginModel = require("../../model/authentication/loginModel");
const bcrypt = require("bcrypt");
const { tokenGenerate } = require("../../others/tokenGeneration");

const login = (req, res) => {
  const { email, password } = req.body;

  loginModel.emailCheck(email, password, async (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error" });
    } else if (result == "User not found") {
      res.status(200).json({ message: "Signup Yourself" });
    } else {
      let status = await bcrypt.compare(password, result[0].password);
      let response = status ? tokenGenerate(result[0].id) : "Password Wrong";
      res.status(200).json({ message: response });
    }
  });
};

module.exports = { login };
