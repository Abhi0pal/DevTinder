const express = require("express");

const app = express();


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

app.get("/user",(req,res)=>{
    resizeBy.send({firstName:"abhi",LastName:"Pal"});
})

app.post("/user",(req,res)=>{
    res.send("Data Sucessfully Saved to data base")
})
app.delete("/user",(req,res)=>{
    res.send("Deleted succesfully");
})

app.listen(3000,()=>{
    console.log("now data successfully loaded");
    
})
