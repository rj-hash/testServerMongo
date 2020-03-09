const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CollectionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, sparse: true },
    timelines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Timeline" }]
  },
  {
    timestamps: true
  }
);

var ProfileSchema = new Schema({
  marital_status: { type: String }
});

var User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: ProfileSchema,
    collections: [CollectionSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
