const express = require("express")
const {connectDB} = require("./config/database")
const app = express();
const bcrypt = require("bcrypt")
const {validateSignUpData} = require("./utils/validate");
const User = require("./models/user")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userauth} = require("./middlewares/auth")
app.use(express.json());
app.use(cookieParser());
// creating new user
app.post("/signup",async (req, res) => {
    //Creating a new instance of the user model
    const {firstName,lastName,password,emailId} = req.body;
    try {
        // validate the data using halper function
    validateSignUpData(req);
    
    //create your encript password
    const passwordHash =  await bcrypt.hash(password,10);
    
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }
    );
        await user.save();
        res.send("Data saved successfully");
    } catch (err) {
        res.status(500).send("Error saving user:"+ err.message);
    }

  });
app.post("/login",async(req,res) =>{
    try{
    const {emailId, password} = req.body;
    // check the user are exit or note
    const user =  await User.findOne({emailId: emailId});
    if( !user ){
        throw new Error ("Invalid  credentials");
    }
    // check the password are correct or note
    const isPasswordValidate = user.validatePassword(password);
    if(isPasswordValidate){

        const token = await user.getJWT();
        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
        // expire  your cokies in 8 hour
        res.send("login successfully!!");
    }
    else{
        throw new Error("Invalid  credentials");  
    }
}
catch (err) {
    res.status(500).send("Error saving user:"+ err.message);
}
    
})
app.get("/profile", userauth ,async(req,res) => {
    try{
        const user = req.user;
   
    res.send(user);

    }
    catch (err) {
        res.status(500).send("Error saving user:"+ err.message);
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