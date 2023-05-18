let db = require('../../Util/database');

let homePage = (req,res)=>{
    try{
    let {user_id} = req.user;
    db.query('select first_name,last_name,profile,id from account where id = ?',[user_id], (err,resu)=>{
        if(err){
            console.log(err);
            res.status.send({message : "Error at fetching"});
        }
        else{
            // console.log(res);
            db.query(`SELECT post.post_id, post.image, post.caption, NULL AS name, account.first_name, account.last_name, account.profile, account.id FROM post 
             JOIN account ON post.id = account.id WHERE account.id IN 
            (SELECT friends_id FROM friend WHERE id = ? ) 
            UNION SELECT NULL AS post_id, ads.image, NULL AS caption, ads.name, NULL AS first_name, NULL AS last_name, NULL AS profile, NULL AS id FROM ads;
            `, [user_id], (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(404).send({message : "Error at fetching"});
                }
                else if(result.length>0){
                    console.log("you have feed");
                    res.status(201).send({message : result,resu});
                }
                else{
                    console.log("you don't have any here add some friends");
                    res.status(201).send({message : "you don't have any here add some friends"});
                }
                })
            // res.status(201).send({message : res});
        }
    })
    }
    catch(e){
        console.log(e);
        res.status(401).send("Something went wrong");
    }
}

module.exports = { homePage }