const skillsetModel = require("../../model/skillset/skillsetModel");

const skillSet = (req, res) => {
//   const { id } = req.user;
  const { id, about, description, languages } = req.body;
  skillsetModel.skillset(id, about, description, languages , (err, result) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json({ message: "Updated skillset" });
    }
  });
};

const updateSkillset = (req, res) => {
  const {id} = req.user;
  // const 
  // skillsetModel.updation(id, )
}


module.exports = { skillSet, updateSkillset };
