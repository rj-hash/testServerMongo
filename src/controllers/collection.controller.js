const User = require("../models/user.model");

exports.addCollection = (req, res) => {
  if (req.session.user) {
    const data = req.body;

    const col = {
      name: data.name,
      timelines: []
    };

    User.update(
      { _id: req.session.user.u_id },
      { $push: { collections: col } },
      err => {
        res.send(err);
      }
    );
  } else {
    res.send("You need to login!!");
  }
};
