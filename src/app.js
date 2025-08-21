const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//here we import Validation made by us
const { validationSignUpData } = require("./utils/validation.js");

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

//API these are middleware
app.use(express.json()); //convert data into json format
app.use(cookieParser());

//Post API (SignUp API)

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validationSignUpData(req); //import it from validation.js
    //extracting the field out
    const { firstName, lastName, emailID, password } = req.body;
    //encrypt our password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //Creating a new instance of user Model
    //   this is the bad way to fetch data from frontend
    //const user = new User(req.body); //front end se aye ga data
    //this is the best way to fetch data
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save(); //phir yebdata save karne ka method
    res.send("User registedred Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

//Log in API

app.post("/login", async (req, res) => {
  try {
    //it validate our emailId and password when user will Login
    const { emailID, password } = req.body;
    //check user emailId is in  database or not
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Email Id not Found in our System");
    }
    //compare the password hashpassword in database with user enter in login page
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //all work of cookies and jwt
      //create jwt TOKEN
      const token = jwt.sign({ _id: user._id }, "DEVTINDER");
      // OR send in response body
      // store token in cookie
      res.cookie("token", token, {
        httpOnly: true, // prevents client JS from reading cookie
        secure: false, // true if using HTTPS
        sameSite: "strict",
      });
      console.log(token);

      // add the Token to cookie and send back to  the user
      // res.cookie("token","sdcsfrfrferfrerdscdffrfsdddfwfwf");

      res.send("Login Successfully...");
    } else {
      throw new Error("Password is not Valid...");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//Profile API
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    //validate my token
    const decodedMessage = jwt.verify(token, "DEVTINDER");
    console.log(decodedMessage);
    res.send("Reading Cookies....");
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
});

//Get User by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  try {
    const user = await User.find({ emailID: userEmail });
    if (user.length === 0) {
      res.status(401).send("Sorry User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Error will Occur");
  }
});

//Feed API - Get /feed- get ALL the users from the database
app.get("/feed", async (req, res) => {
  try {
    //Get all the data
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(401).send("Something went Wrong");
  }
});

// delete API delete the user from data base
app.delete("/user", async (req, res) => {
  const userId = req.body.userId; //USer id fetch hogi jissse delete karna hai
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Error We Can't Delete");
  }
});

//Update the user Details

app.patch("/user/:_id", async (req, res) => {
  const userId = req.params._id; //user Id where changes will be perform
  const data = req.body; //yhe upadate karna hah frontend se aye ga

  try {
    //we won't allow to update some field in schema like emain ,first name -this process called Data Sanitization(not exactly that but something is that)
    //this line means that-> when a user tries to update data, only the fields defined in ALLOWED_UPDATES can be modified. It prevents updating restricted fields like password or role
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
    //looping all the key in Allowed_Update check it data have this key or not
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("We can't update this...Sorry");
    }
    if (data?.skills > 10) {
      throw new Error("Skills cannot be more than 10...");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);

    res.send("User Updated SuccessFully...");
  } catch (err) {
    res.status(500).send("Error will Occur...");
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
