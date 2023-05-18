const db = require("../../Util/database");

let savePost = (req, res) => {
  const { user_id } = req.user;
  const post_id = req.body.post_id;
  try {
    const statement = "insert into save_post values (?,?)";
    db.query(statement, [user_id, post_id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "Error at saving" });
      } else {
        console.log("ok");
        res.status(201).send({ message: "Saved succesfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: " Something went wrong" });
  }
};

let removeSaved = (req, res) => {
  const { user_id } = req.user;
  const post_id = req.body.post_id;
  try {
    const statement = "delete from save_post where id = ? and post_id = ?";
    db.query(statement, [user_id, post_id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "Error at Retrieving" });
      } else {
        console.log("ok");
        res.status(201).send({ message: "Removed Successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let getSaved = (req, res) => {
  const { user_id } = req.user;
  try {
    const statement = "select post_id from save_post where id = ?";
    db.query(statement, [user_id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "Error at Retrieving" });
      } else if(result.length == 0){
        console.log("ok");
        res.status(201).send({message : "Nothing saved here :)"});
      } 
      else {
        console.log("ok");
        res.status(201).send({ message: result });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Something went wrong" });
  }
};

module.exports = { savePost, removeSaved, getSaved };
