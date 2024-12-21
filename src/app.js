const express = require("express")
const {connectDB} = require("./config/database")
const app = express();
// const {userauth,adminauth} = require("./middlewares/auth")
const User = require("./models/user")
app.use(express.json());
app.post("/signup",async (req, res) => {
    //Creating a new instance of the user model
    const user = new User(req.body);
    console.log(req.body)
    try {
        await user.save();
        res.send("Data saved successfully");
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }

  });

connectDB()
 .then( () =>{
    console.log("connection successfully");
    app.listen(7777,()=>{
        console.log("server listen successfully");
    });
    
 }
 )
 .catch((err) =>{
    console.log("connection faild");
 });