const User = require("../models/user.model");
const Timeline = require("../models/timeline.model");
const TimelineEvents = require("../models/timelineEvents.model");

// Create new User

exports.create = (req, res) => {
  const data = req.body;
  const user = new User({
    name: data.name,
    email: data.email,
    password: data.password
  });

  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err.message);
    });
};

exports.findAll = (req, res) => {
  if (req.session.user) {
    // User.findOne({ _id: req.session.user.u_id })
    //   .populate("collections.timelines")
    //   .exec((err, data) => {
    //     res.send(data);
    //   });

    User.findOne({ _id: req.session.user.u_id })
      .populate({
        path: "collections.timelines",
        model: Timeline,
        populate: {
          path: "events",
          model: TimelineEvents
        }
      })
      .exec((err, data) => {
        res.send(data);
      });
  } else {
    res.send("You need to Login!");
  }
};
