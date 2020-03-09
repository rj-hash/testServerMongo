const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TimelineEventsSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TimelineEvents", TimelineEventsSchema);
