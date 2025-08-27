const express=require("express");
const profileRouter=express.Router();
const User = require("../models/user");
const {userAuth}=require("../middleware/auth");
const requestRouter = require("./request");
const {validateEditProfileData,validationSignUpData}=require("../utils/validation")

profileRouter.get("/profile", userAuth,async (req, res) => {
  try {
   
    const user=req.user;
    if(!user){
        throw new user("USer will not be present..");

    }
    console.log("Logged in User is: "+user);
    
    res.send("Reading Cookies....");
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // Allow only specific fields (make sure your validator matches your schema)
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Invalid field(s)");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true } // Mongoose will enforce enum/min/max/etc.
    );

    if (!updatedUser) return res.status(404).send("User not found");
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});




module.exports=profileRouter;