const User = require("../models/user.model");
// const UserProfile = require("../models/userProfile.model");

exports.update = async (req, res) => {
  if (req.session.user) {
    const data = req.body;

    // var user = User.findOne({ email: req.session.user.email });

    // user.profile.marital_status = data.marital_status;

    User.findByIdAndUpdate(
      { _id: req.session.user.u_id },
      {
        profile: {
          marital_status: data.marital_status
        }
      },
      err => {
        res.send(err);
      }
    );
  } else {
    res.send("You need to login");
  }
};
