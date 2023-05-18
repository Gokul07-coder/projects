// const mysql = require("mysql");

// const db = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.DB_USER, 
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// try {
//   db.getConnection((err) => {
//     if (err) throw err;
//     console.log("connection success");
//   });
// } catch (e) {
//   console.log(e);
// }

// module.exports = db;


const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER, 
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

db.on('error', function (err) {
  console.log('Database error:', err);
});
 
module.exports = db;

 