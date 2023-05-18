//adding the social media links along with the id

const {
  addLinks,
  updateLinks,
} = require("../../model/social_media/socialMediaModel");

const addSocialProfile = (req, res) => {
  const { id } = req.user;
  const profile = req.body;
  let array = [];
  let array2 = ["instagram", "facebook", "linkedin", "twitter"];
  array2.map((item) => array.push(profile?.[item] || null));
  console.log(array);
  addLinks(id, ...array, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.status(200).json({ message: "Updated" });
    }
  });
};

const updateSocialProfile = (req, res) => {
  const { id } = req.user;
  const profile = req.body;
  let array = [];
  let array2 = ["instagram", "facebook", "linkedin", "twitter"];
  array2.map((item) => array.push(profile?.[item] || null));
  console.log(array);
  updateLinks(id, ...array, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.status(200).json({ message: "Updated" });
    }
  });
};



module.exports = { addSocialProfile, updateSocialProfile };
