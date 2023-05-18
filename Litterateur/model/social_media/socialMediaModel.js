const db = require("../../util/database");

const addLinks = (id, instagram, facebook, linkedin, twitter, callback) => {
  const query = "insert into social_media values (?,?,?,?,?)";
  db.query(
    query,
    [id, instagram, facebook, linkedin, twitter],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const updateLinks = (id, instagram, facebook, linkedin, twitter, callback) => {
  const query =
    "UPDATE social_media SET instagram = ?, facebook= ? , linked_in = ?, twitter = ? WHERE id = ?";
  db.query(
    query,
    [instagram, facebook, linkedin, twitter, id],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

module.exports = { addLinks, updateLinks };
