const mongoose = require("mongoose");
const validator=require("validator");
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
      //email validation 
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email address"+value);

        }
      },
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
      //validate Valid URL
      validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid Photo URL");

        }
      }
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
