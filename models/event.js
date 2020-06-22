const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const event = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      auto: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    lifeGuardId: { type: ObjectId, ref: "LifeGuard", required: true },
    beachId: { type: ObjectId, ref: "Beach", required: true },
    videoUrl: String,
    thumbnailURL: String,
    telemtryURL: String,
    loggerURL: String,
    note: String,
  },
  { timestamps: true }
);

event.virtual("eventId").get(() => {
  return this._id;
});

const Event = mongoose.model("Event", event);

module.exports = Event;
