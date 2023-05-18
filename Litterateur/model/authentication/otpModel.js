const db = require("../../util/database");

const otpStoring = (id, otp, callback) => {
  console.log(id, otp);
  const query = "insert into otp values(?, ?)";
  db.query(query, [id, otp], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getOTP = (id, callback) => {
  const query = "select * from otp where id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
};

const deleteOTP = (id, callback) => {
  const query = "delete from otp where id =?";
  db.query(query, [id], (err, result) => {
    if(err){
      // console.log(err);
      callback(err, null);
    }
    else{
      // console.log("Deletion successful");
      callback(null, result);
    }
  });
};

module.exports = { otpStoring, getOTP, deleteOTP };
