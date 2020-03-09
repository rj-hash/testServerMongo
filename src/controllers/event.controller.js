const TimelineEvents = require("../models/timelineEvents.model");
const User = require("../models/user.model");
const Timeline = require("../models/timeline.model");

exports.create = (req, res) => {
  if (req.session.user) {
    const data = req.body;

    const event = new TimelineEvents({
      title: data.title,
      desc: data.desc
    });

    event
      .save()
      .then(data => {
        // res.send(data);
        console.log(data);
      })
      .catch(err => {
        res.send(err.message);
      });

    const collection_name = req.params.collection;
    const timeline_name = req.params.timeline;

    User.findOne({ _id: req.session.user.u_id })
      .then(data => {
        var col1 = data.collections.filter(i => i.name === collection_name);

        var timeline1 = col1[0].timelines;

        Timeline.findOne({ _id: timeline1[0] })
          .then(data => {
            data.events.push(event);

            data.save((err, d) => {
              res.send(d);
            });
          })
          .catch(err => {
            res.send(err.message);
          });

        // .filter(i => i.name === timeline_name);

        // timeline1.events.push(event);

        // res.send(timeline1[0]);
        // res.send(col1[0]);

        // data.save((err, d) => {
        //   res.send(d);
        // });
      })
      .catch(err => {
        res.send(err.message);
      });
  } else {
    res.send("You need to login!");
  }
};
