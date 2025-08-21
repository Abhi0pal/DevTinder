const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const adminAuth=(req,res,next)=>{
//     console.log("Admin auth is getting checked!!");
//     const token="xyz";
//     const isAdminAuthorized=token==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthrized Access request");
//     }
//     else{
//         next();
//     }
//
//
// };

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    } 

    const decodeObj = await jwt.verify(token, "DEVTINDER");
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("USer not found");
    } 
    req.user=user;
    next();
    
  } catch (err) {
    res.send("Error :"+err.message);
  }
};

module.exports = { userAuth };
