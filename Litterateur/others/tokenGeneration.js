const jwt = require("jsonwebtoken");

const tokenGenerate = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRET , {
    expiresIn: "7d",
  });
  return token;
};

module.exports = { tokenGenerate };
