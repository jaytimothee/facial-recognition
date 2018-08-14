const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries);
    })
    .catch(err => {
      res.json("unable to get count");
    });
};

module.exports = {
  handleImage: handleImage
};
