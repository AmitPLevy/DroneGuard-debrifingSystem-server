const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const location = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true
    },
    x: Number,
    y: Number,
    z: Number
  },
  { timestamps: true }
);

location.virtual("locationId").get(() => {
  return this._id;
});

const Location = mongoose.model("Location", location);

module.exports = Location;
