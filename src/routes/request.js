const express=require("express");

const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");


requestRouter.get("/sendConnectionRequest",userAuth,async(req,res)=>{
  //user fetch from req
  const user=req.user;


  console.log("Sending a connection request...");

  res.send(user.firstName+" sending Connection request...");
  


});







module.exports=requestRouter;