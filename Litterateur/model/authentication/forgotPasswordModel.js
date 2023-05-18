const db = require("../../util/database");

const updatePassword = async (id, password, callback) => {
  console.log(password);
  const query = "update account set password = ? where id = ?";
  db.query(query, [password, id], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { updatePassword };
