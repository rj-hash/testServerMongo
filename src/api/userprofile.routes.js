module.exports = app => {
  //   const UserProfile = require("../models/userProfile.model");
  const profile = require("../controllers/userProfile.controller");

  app.put("/edit_profile", profile.update);
};
