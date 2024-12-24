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
    const isPasswordValidate = await bcrypt.compare(password, user.password);
    if(isPasswordValidate){

        const token = jwt.sign({_id:user._id},"Mahendra@7878");
        res.cookie("token",token);
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

})
//update the user

app.patch("/user",userauth, async(req,res) => {
    const user = req.user;
    const {userId} = user._id;
    const data = req.body;
    try{
        const UPDATE_ALLOWED = [
            "gender",
            "photoUrl",
            "age",
            "skills"
        ];
        const isUpdate = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));

        if(!isUpdate){
            throw new Error(" update are note allowed");
        }
        if(data?.skills >10){
            throw new Error("note greater then 10");
        }
        // const user =  await User.findOneAndUpdate({emailId:userId},data);
        const user = await User.findByIdAndUpdate(userId,data, {returnDocument : "after",runValidators:true});
        // console.log(user)
        res.send("data update successfully");
    }
     catch (err) {
            
            res.status(500).send("Error saving user " + err.message); 
    }

});
// delete the user 
//find the user using userid
app.get("/user",userauth, async(req,res) => {
    // const users = await User.findOne({emailId:req.body.emailId});
    try {
        const user = req.user;
        
        res.send(user);
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

app.delete("/user",userauth, async(req,res) => {
    try {
     const user = req.user;
     const {_id} = user._id;
    const usersid= await User.findByIdAndDelete(_id);
       res.send("user deleted successfully")
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

app.get("/feed", async(req,res) => {
    try {
        const users = await User.find();
        if(users.length == 0){
            res.send("user not found");
        }
        else{
            res.send(users);
        }
    }
    catch (err) {
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