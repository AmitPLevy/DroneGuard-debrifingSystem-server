const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const beach = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true
    },
    name: String,
    droneId: { type: ObjectId, ref: "Drone" },
    lifeGuards: [{ type: ObjectId, ref: "LifeGuard" }],
    image: String
  },
  { timestamps: true }
);

beach.virtual("beachId").get(() => {
  return this._id;
});

const Beach = mongoose.model("Beach", beach);

module.exports = Beach;
