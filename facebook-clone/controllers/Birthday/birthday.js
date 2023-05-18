// routes in friend_req - okay ?

const db = require('../../Util/database');

const upcomingBirthday = (req,res) =>{
    try{
        const {user_id} = req.user;
        db.query(`SELECT first_name, dob 
        FROM account 
        WHERE DATE_FORMAT(dob, '%m-%d') >= DATE_FORMAT(CURDATE(), '%m-%d') 
        AND id IN (SELECT friends_id FROM friend WHERE id = ?) 
        ORDER BY DATE_FORMAT(dob, '%m-%d') ASC;
        `, [user_id], 
        (err,result)=>{
            if(err){
                console.log(err);
                res.send("Unable to retrieve").status(400);
            }
            else{
                console.log(result);
                res.send({message: result}).status(200);
            }
        })
    }
    catch (e){
        console.log(e);
        res.send("Something went wrong").status(500);
    }
}

module.exports = {upcomingBirthday}