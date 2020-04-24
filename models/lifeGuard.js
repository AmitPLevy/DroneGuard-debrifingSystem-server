const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const lifeGuard = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true
    },
    name: String,
    image: String
  },
  { timestamps: true }
);

lifeGuard.virtual("lifeGuardId").get(() => {
  return this._id;
});

const LifeGuard = mongoose.model("LifeGuard", lifeGuard);

module.exports = LifeGuard;
