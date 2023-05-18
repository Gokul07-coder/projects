const db = require("../util/database");

accountVerification = (id, callback) => {
  const query = "update account set isVerified = 1 where id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};



module.exports = { accountVerification };
