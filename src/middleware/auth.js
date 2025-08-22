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
    //
    
    // 1. Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    } 

     // 2. Verify the token
    const decodeObj = await jwt.verify(token, "DEVTINDER");
    const { _id } = decodeObj;

    // 3. Fetch user from database using decoded _id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("USer not found");
    } 
     // 4. Attach user object to request (so next middleware/controller can use it)
    req.user=user;
    // 5. Pass control to the next middleware or route handler
    next();
    
  } catch (err) {
    // / 6. Handle errors like missing/invalid token or user not found
    res.send("Error :"+err.message);
  }
};

module.exports = { userAuth };
