const handleSignin = (req, res, db, bcrypt) => {
    const { password } = req.body;
    db.select("email", "hash")
      .from("login")
      .where("email", "=", req.body.email)
      .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then(user => {
              res.json(user[0]);
            })
            .catch(err => res.status(400).json("unable to log in"));
        } else {
          res.status(400).json("wrong credentials");
        }
      })
      .catch(err => res.status(400).json("no user found"));
  };

  module.exports ={
      handleSignin: handleSignin
  }