const express = require("express")
const authRouter = express.Router();
const bcrypt = require("bcrypt")
const {validateSignUpData} = require("../utils/validate");
const User = require("../models/user")

authRouter.post("/signup",async (req, res) => {
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
authRouter.post("/login",async(req,res) =>{
    try{
    const {emailId, password} = req.body;
    // check the user are exit or note
    const user =  await User.findOne({emailId: emailId});
    if( !user ){
        throw new Error ("Invalid  credentials");
    }
    // check the password are correct or note
    const isPasswordValidate = await user.validatePassword(password);
    if( isPasswordValidate){

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
    
});
authRouter.post("/logout",async (req,res) =>{
    res
    .cookie("token" ,null ,{expires: new Date(Date.now())})
    .send("logout user")
});


module.exports = authRouter;