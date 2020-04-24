const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const drone = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true
    },
    droneNumber: Number,
    raspberryIp: String
  },
  { timestamps: true }
);

drone.virtual("droneId").get(() => {
  return this._id;
});

const Drone = mongoose.model("Drone", drone);

module.exports = Drone;
