const db = require("../../Util/database");

const mutualCount = (req, res) => {
  try {
    const { user_id } = req.user;
    const friend_id = req.body.friend_id;
    console.log(user_id, friend_id);
    db.query(
      `SELECT A.friends_id
        FROM friend A
        JOIN friend B ON A.friends_id = B.friends_id
        WHERE A.id = ? AND B.id = ?
        `,
      [user_id, friend_id],
      (err, result) => {
        if (err) {
          console.log("Error: " + err);
          res.send({ message: "Error at retrieving" }).status(400);
        } else {
          console.log(result[0].friends_id);
          res.send({ count: result[0].friends_id }).status(200);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.send({ message: "Something went wrong" }).status(500);
  }
};

const mutualList = (req, res) => {
  try {
    let { user_id } = req.user;
    let friend_id = req.body.friend_id;
    console.log(user_id, friend_id);
    db.query(
      `select first_name,profile from account where id in 
        (select A.friends_id as mutual_friend from friend A JOIN friend B 
        on A.friends_id = B.friends_id where A.id = ? and B.id = ?);
        `,
      [user_id, friend_id],
      (err, result) => {
        if(err){
            console.log(err);
            res,send("Error at retrieving").status(400);
        }
        else{
            console.log(result[0].profile, result[0].first_name);
            res.send({message : result}).status(200);
        }
      }
    );

  } catch (e) {
    console.log(e);
    res.send({ message: "Something went wrong" }).status(500);
  }
};

module.exports = { mutualCount, mutualList};
