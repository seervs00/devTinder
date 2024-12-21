const express = require("express")
const {connectDB} = require("./config/database")
const app = express();
// const {userauth,adminauth} = require("./middlewares/auth")
const User = require("./models/user")
app.use(express.json());

app.get("/user", async(req,res) => {
    const users = await User.findOne({emailId:req.body.emailId});
    try {
        
        res.send(users);
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

app.get("/feed", async(req,res) => {
    const users = await User.find();
    try {
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