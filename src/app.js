const express=require("express");

const app=express();

app.use("/happy",(req,res)=>{
    res.send("Hello this is HAppy Server");
    
});

app.use("/test",(req, res) => {
    res.status(404).send("Page not found!");
});




app.listen(3000,()=>{
    console.log("Server is lostening on port 3000...");
    
});
