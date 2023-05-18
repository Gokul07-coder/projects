const db = require("../../util/database");

const checkEmail = (email, callback) => {
  const query = "select id from account where email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result.length);
    }
  });
};

const uniqueNameCheck = (uniqueName, callback) => {
  const query = "select id from account where unique_name = ?";
  db.query(query, [uniqueName], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result.length);
    }
  });
};

const createAccount = (name, email, dob, gender, hashPassword, callback) => {
  // console.log(name, email, dob, gender, hashPassword, "from db");
  const query =
    "insert into account (name,email,dob,gender,password) values (?,?,?,?,?)";
    console.log(hashPassword);
  db.query(query, [name, email, dob, gender, hashPassword], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getId = (email, callback) => {
  const query = "select id from account where email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const tokenInsertion = (id, token, callback) => {
  const query = "update account set token = ? where id = ?";
  db.query(query, [token, id], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  checkEmail,
  uniqueNameCheck,
  createAccount,
  getId,
  tokenInsertion,
};
