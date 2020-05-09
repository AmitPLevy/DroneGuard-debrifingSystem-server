const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const admin = new mongoose.Schema(
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

admin.virtual("lifeGuardId").get(() => {
  return this._id;
});

const Admin = mongoose.model("Admin", admin);

module.exports = Admin;
