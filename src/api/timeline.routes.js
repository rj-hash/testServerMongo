module.exports = app => {
  const timeline = require("../controllers/timeline.controller");
  const event = require("../controllers/event.controller");
  app.post("/add_timeline/:collection", timeline.create);

  app.post("/add_event/:collection/:timeline", event.create);
};
