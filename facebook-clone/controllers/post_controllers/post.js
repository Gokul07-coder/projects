const db = require("../../Util/database");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const route = express.Router();
const fs = require("fs");


async function uploadToCloud(localFilePath) {
  return cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "image",
      folder: "Home/post",
    })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      // console.log("ok .......");
      return result.url;
    })
    .catch((err) => {
      fs.unlinkSync(localFilePath);
      return { message: "fail" };
    });
}

let getPost = (req, res) => {
  // res.json({message : "View your post here"});
  let { user_id } = req.user;
  db.query("Select * from post where id = ?", [user_id], (err, result) => {
    if (err) {
      console.log("Error at fetching data", err);
    } else if (result.length == 0) {
      console.log("You haven't Posted Anything post something to view");
      res.status(201).json({ message: "NO POST AVAILABLE" });
    } else if (result.length > 0) {
      console.log("you have post");
      // console.log(result)
      res.status(201).send(result);
      // res.status(201).json({message : "POST AVAILABLE"});
    }
  });
};

let upload_post = async (req, res) => {
  
  let { user_id } = req.user;
  console.log(user_id);
  var localFilePath = req.file.path;
  console.log(localFilePath);
  console.log("Upload post here");
  try {
    var resultant = await uploadToCloud(localFilePath, (err) => {
      if (err) console.log("error to reach server");
    });
  } catch(e) {
    console.log(e);
    console.log("Error at uploading");
  }
  try {
    console.log(resultant);
    const image = resultant;
    const caption = req.body.caption;
    console.log(caption === "");
    if (caption === "") {
      db.query(
        "insert into post (id,image) values (?,?)",
        [user_id, resultant],
        (err, result) => {
          if (err) {
            console.log("Error at posting");
            console.log(err);
            res.status(501).json({ message: "Unable to post" });
          } else {
            console.log("Posted successfully");
            res.status(201).json({ message: "Posted successfully" });
          }
        }
      );
    }
    // else {}
    db.query(
      "insert into post (id,image,caption) values (?,?,?) ",
      [user_id, resultant, caption],
      (err, result) => {
        if (err) {
          console.log("Error at posting");
          console.log(err);
          res.status(501).json({ message: "Unable to post" });
        } else {
          console.log("Posted successfully");
          res.status(201).json({ message: "Posted successfully" });
        }
      }
    );
  } catch {
    console.log("Something went wrong");
  }
};

module.exports = { getPost, upload_post };

