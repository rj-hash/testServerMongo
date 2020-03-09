module.exports = app => {
  const user = require("../controllers/user.controller");
  const UserModel = require("../models/user.model");
  const collection = require("../controllers/collection.controller");

  app.post("/signup", user.create);

  app.get("/user_profile", user.findAll);

  app.post("/add_collection", collection.addCollection);

  app.post("/login", async (req, res) => {
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user !== null) {
        req.session.user = {
          email: user.email,
          name: user.name,
          u_id: user._id
        };
        res.send("success login");
      } else {
        res.send("login failure");
      }
    } catch (err) {
      res.send(err.message);
    }
  });

  app.get("/logout", (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      res.send("user logout");
    } else {
      res.send("logout failure");
    }
  });
};
