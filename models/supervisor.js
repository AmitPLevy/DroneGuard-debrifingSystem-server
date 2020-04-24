const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const supervisor = new mongoose.Schema(
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

supervisor.virtual("lifeGuardId").get(() => {
  return this._id;
});

const Supervisor = mongoose.model("Supervisor", supervisor);

module.exports = Supervisor;
