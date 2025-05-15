const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userauth= async(req,res,next) =>{
 try{
    const {token} = req.cookies;
    if(!token){
        return  res.status(401).send("please login")
       }
    const encodedMessage = await jwt.verify(token,"Mahendra@7878");
    const {_id} = encodedMessage;
    
    const user = await User.findById(_id);
    if(!user){
        throw new Error("user not valid ");
    }
    req.user = user;
    next();
 }
 catch(err){
    res.status(500).send("Error saving user:"+ err.message);
 }

}
module.exports = {userauth};