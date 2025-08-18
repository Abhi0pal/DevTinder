const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked!!");
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthrized Access request");
    }
    else{
        next();
    }
    

};

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("User Unauthorized Access");
    }
    else{
        next();
    }

};

module.exports={adminAuth,userAuth};