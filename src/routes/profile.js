const express=require("express");
const profileRouter=express.Router();
const User = require("../models/user");
const {userAuth}=require("../middleware/auth");

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





module.exports=profileRouter;