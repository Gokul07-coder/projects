const db = require("../../util/database");

const skillset = (id, about, description, languages, callback) => {
  languages = JSON.stringify(languages);
  const query =
    "insert into skillset (id, about, description, languages) values (?, ?, ?, ?)";
  db.query(query, [id, about, description, languages], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// const updation = 

module.exports = { skillset };
