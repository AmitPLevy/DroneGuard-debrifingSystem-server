const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const event = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true
    },
    startTime: Date,
    endTime: Date,
    liftGuard: { type: ObjectId, ref: "LifeGuard" },
    beach: { type: ObjectId, ref: "Beach" },
    videoUrl: String
  },
  { timestamps: true }
);

event.virtual("eventId").get(() => {
  return this._id;
});

const Event = mongoose.model("Event", event);

module.exports = Event;
