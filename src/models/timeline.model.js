const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  name: { type: String, required: true, unique: true, sparse: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimelineEvents" }]
});

module.exports = mongoose.model("Timeline", TimelineSchema);
