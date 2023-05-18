const jwt = require("jsonwebtoken");

let refToken = (req, res, next) => {
  //   console.log("ok at token side");
  // const token = req.headers.authorization?.split(' ')[1];
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: "Invalid token." });
      else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Missing token." });
  }
};

module.exports = { refToken };
