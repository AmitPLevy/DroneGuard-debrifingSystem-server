const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const user = new mongoose.Schema(
  {
    userId: { type: ObjectId, refPath: "userType" },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    lastLogin: Date,
    userType: {
      type: String,
      enum: ["LifeGuard", "Supervisor"]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;
