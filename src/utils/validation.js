// API level Validation
const validator=require("validator");
const validationSignUpData=(req)=>{

    const {firstName,lastName,emailID,password}=req.body;

    if(!firstName||!lastName){
        throw new Error("Name is not valid");
    }
    else if(firstName.length<4||firstName>50){
        throw new error("this is not Valid");

    }
    else if(!validator.isEmail(emailID)){
        throw new error("Email is not valid");;
    }
    else if(!validator.isStrongPassword(password)){
        throw new error("Please enter strong password")
    }


};
module.exports={
    validationSignUpData
};