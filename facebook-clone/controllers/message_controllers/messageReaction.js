const db = require('../../Util/database');

let reactTomessage = (req,res)=>{
    let {user_id} = req.user;
    const {reaction,message_id} = req.body;
    try{
        db.query('insert into messageReaction values (?,?,?)', [reaction,message_id,user_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Unable to react"});
            }
            else{
                
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).send({message : "Something went wrong"})
    }

}

module.exports = {}