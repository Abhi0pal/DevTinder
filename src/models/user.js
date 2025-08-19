const mongoose =require("mongoose");
// this is Schema
const userSchema=new mongoose.Schema(
    {
       firstName:{
        type:String
       } ,
       lastName:{
        type:String
       },
       emailID:{
        type:String
       },
       password:{
        type:String
       },
       age:{
        type:Number
       },
       gender:{
        type:String
       }
    }
);
//Model is like constructor of Schema 
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;