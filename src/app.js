const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// const {adminAuth,userAuth}=require("./middleware/auth");

// app.use("/happy", (req, res) => {
//   res.send("Hello this is HAppy Server");
// });
//
// app.use("/test", (req, res) => {
//   res.status(404).send("Page not found");
// });
//
// app.listen(3000, () => {
//   console.log("Server is lostening on port 3000...");
// });
//
// app.use((req, res) => {
//   res.send("This is the main page Now...");
// });

// app.get("/user",(req,res)=>{
//     resizeBy.send({firstName:"abhi",LastName:"Pal"});
// })
//
// app.post("/user",(req,res)=>{
//     res.send("Data Sucessfully Saved to data base")
// })
// app.delete("/user",(req,res)=>{
//     res.send("Deleted succesfully");
// })
//

//  concept of NEXT()

// app.use("/user",(req,res,next)=>{
//     console.log("Now running One response");
//     // res.send("Response 1");
//     next();
// },(req,res)=>{
//     console.log("Now Running Two response");
//     res.send("Response 2");
// }
// );
//
//
// app.use((req,res)=>{
//     console.log("MAin is running ");
//     res.send("Main is running");
// })

//middleware phele hei check kar liya admin ko agge jane dena hai ya nahi

// app.use("/admin",adminAuth);
//
//
//
// app.get("/admin/getAllData",(req,res)=>{
//     res.send("Data Will Be Sent...");
// });
//
// app.get("/user",userAuth,(req,res,next)=>{
//     res.send("User Data Will be Send");
// });

//Error Handling

// app.get("/user",(req,res)=>{
//     try{
//         throw new Error("azdsdds");
//         res.send("user Data is Sent");
//
//
//     }
//     catch(err){
//         res.status(500).send("Contact to Support Team...");
//
//     }
//
// });

// first way

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong");
//
//     }
//
//
// });

//API
app.use(express.json()); //convert data into json format
app.post("/signup", async (req, res) => {
    //Creating a new instance pf user Model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User registedred Successfully");
  } catch (err) {
    res.status(400).send("error saving the user");
  }
});

//connect database first then port will listen
//this is for first we will connect to databaase then we will listing to port

connectDB()
  .then(() => {
    console.log("Now DataBase Will be Connected");
    app.listen(3000, () => {
      console.log("Server is Sucessfully listening to the port 3000");
    });
  })
  .catch((err) => {
    console.log("Error will be Encounter");
  });
// Both are same ;

// connectDB().then(
//     ()=>{
//         console.log("Connected Successfully...");
// }).catch(err=>{
//     console.log("Database cannot be established");
// });

// app.listen(3000,()=>{
//     console.log("now data successfully loaded");
//
// })
