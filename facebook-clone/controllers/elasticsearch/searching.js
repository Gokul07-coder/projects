const { client } = require("../../Util/elasticsearch");

const addition = (id, name) => {
  client
    .index({
      index: "account",
      type: "person",
      body: {
        id: id,
        name: name,
      },
    })
    .then(() => {
      console.log("Okay inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};

const searching = (req, res) => {
  const searchText = req.body.firstname;
  console.log(searchText);
  client
    .search({
      index: "account",
      body: {
        query: {
          match: { name: searchText.trim() },
        },
      },
    })
    .then((response) => {
      console.log("OK found");
      res.send({ result: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
};

const modification = () => {
  client.update;
};

module.exports = { addition, searching };
