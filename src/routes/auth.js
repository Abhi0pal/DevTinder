const express=require("express");
const jwt = require("jsonwebtoken");
//here we import Validation made by us
const { validationSignUpData } = require("../utils/validation.js");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter=express.Router();


authRouter.post("/login", async (req, res) => {
  try {
    //it validate our emailId and password when user will Login
    const { emailID, password } = req.body;
    //check user emailId is in  database or not
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Email Id not Found in our System");
    }
    //compare the password hashpassword in database with user enter in login page
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //all work of cookies and jwt
      //create jwt TOKEN
      const token = jwt.sign({ _id: user._id }, "DEVTINDER");
      // OR send in response body
      // store token in cookie
      res.cookie("token", token, {
        httpOnly: true, // prevents client JS from reading cookie
        secure: false, // true if using HTTPS
        sameSite: "strict",
      });
      console.log(token);

      // add the Token to cookie and send back to  the user
      // res.cookie("token","sdcsfrfrferfrerdscdffrfsdddfwfwf");

      res.send("Login Successfully...");
    } else {
      throw new Error("Password is not Valid...");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//Profile API
authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validationSignUpData(req); //import it from validation.js
    //extracting the field out
    const { firstName, lastName, emailID, password } = req.body;
    //encrypt our password,salting
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //Creating a new instance of user Model
    //   this is the bad way to fetch data from frontend
    //const user = new User(req.body); //front end se aye ga data
    //this is the best way to fetch data
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save(); //phir yebdata save karne ka method
    res.send("User registedred Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});



module.exports=authRouter;