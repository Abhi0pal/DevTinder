const express = require("express");

const app = express();

const {adminAuth,userAuth}=require("./middleware/auth");


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

app.use("/admin",adminAuth);



app.get("/admin/getAllData",(req,res)=>{
    res.send("Data Will Be Sent...");
});

app.get("/user",userAuth,(req,res,next)=>{
    res.send("User Data Will be Send");
});


app.listen(3000,()=>{
    console.log("now data successfully loaded");
    
})
