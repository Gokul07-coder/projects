const db = require("../../util/database");

const emailCheck = (email, password, callback) => {
  const query = "select id,password from account where email = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else if (result.length > 0) {
      callback(null, result);
    } else {
      callback(null, "User not found");
    }
  });
};

module.exports = { emailCheck };
