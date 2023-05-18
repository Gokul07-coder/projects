const express = require('express')
const route = express.Router();
const db = require("../Util/database")

var getuser = (req,res)=>{
    let {user_id} = req.user;
    db.query('SELECT profile,first_name,last_name from account where id = ?' ,[user_id], (err,result)=>{
        if(err) console.log(err);
        else{
            console.log(result);
            res.json(result).status(200)
        }
    })
}

module.exports = {getuser};
