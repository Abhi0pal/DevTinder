const mongoose=require("mongoose");



// These are the way two connect DB from data bases
// this is first one 
const connectDB=async()=>{
     await mongoose.connect("mongodb+srv://abhishekpal200404:usBK7taWWsr6U9Lg@namastnode.jemfmji.mongodb.net/devTinder");
};

module.exports=connectDB;





//These are the way two connect DB from data bases
// this is second one 

// const connectDB=async()=>{
//     try{
//         await mongoose.connect("mongodb+srv://abhishekpal200404:usBK7taWWsr6U9Lg@namastnode.jemfmji.mongodb.net/");
//         console.log("data connect Successfully");
//     }
//     catch(err){
//         console.log("Data cannot be Connect ");
//     }
// };
// 
// connectDB();

