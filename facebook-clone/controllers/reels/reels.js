const db = require("../../Util/database");
const cloudinary = require("cloudinary").v2;
const express = require("express");
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

let getReels = (req, res) => {
  const { user_id } = req.user;
  console.log(user_id);
  try {
    console.log(user_id);
    db.query("select *  from reels where id = ?", [user_id], (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error at fetching reels").status(400);
      } else {
        if (result.length == 0) {
          console.log("NO reels");
          res.send("Nothing to show").status(200);
        } else {
          console.log("Reels found");
          res.send(result).status(200);
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Something went wrong" }).status(500);
  }
};

let postReels = async (req, res) => {
  let { user_id } = req.user;
  console.log(user_id);
  var localFilePath = req.file.path;
  console.log(localFilePath);
  console.log("Upload post here");
  try {
    var resultant = await uploadToCloud(localFilePath, (err) => {
      if (err) console.log("error to reach server");
    });
  } catch (e) {
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
        "insert into reels (reels,id) values (?,?)",
        [resultant ,user_id],
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
      "insert into reels (reels,id,caption) values (?,?,?) ",
      [resultant, user_id, caption],
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

module.exports = { getReels, postReels };
