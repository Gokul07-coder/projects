const db = require('../../Util/database');

let search = (req,res) => {
    const name = req.body.name;
    try{
        db.query('select first_name,last_name,id from account where first_name = ?', [name], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "error at fetching"});
            }
            else{
                console.log("ok");
                res.status(201).send({message : result});
            }
        })
    }
    catch(e){
        console.log("Error at catch");
        res.status(401).send({message : "Something went wrong"});
    }
}

module.exports = {search};