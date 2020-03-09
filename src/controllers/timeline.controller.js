const Timeline = require("../models/timeline.model");
const User = require("../models/user.model");

// create new timeline

exports.create = (req, res) => {
  if (req.session.user) {
    const data = req.body;

    const timeline = new Timeline({
      name: data.name
    });
    timeline
      .save()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      });

    const col_name = req.params.collection;

    // var user = new User()

    User.findOne({ _id: req.session.user.u_id })
      .then(data => {
        var col1 = data.collections.filter(i => i.name === col_name);

        col1[0].timelines.push(timeline);

        data.save((err, d) => {
          res.send(d);
        });
      })
      .catch(err => {
        res.send(err.message);
      });
  } else {
    res.send("You need to login!");
  }
};
