const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    title: { type: String },
    img: { type: String },
    email: { type: String, required: true, unique: true },
    contact: { type: Number },
    address: { type: String },
    gender: { type: String },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
