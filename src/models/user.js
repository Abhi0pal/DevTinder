const mongoose = require("mongoose");
// this is Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is Required"],
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    photo: {
      type: String,
    },
    about: {
      type: String,
      default: "This is a default value of about ",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
//Model is like constructor of Schema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
