const express = require("express");
const { userauth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { populate } = require("../models/user");
const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";
userRouter.get("/user/requests/recived", userauth, async (req,res) =>{
   try{
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId", "firstName lastName age gender photoUrl about,skills");
    res.json({message:"request fatched successfully", connectionRequest});
   }
   catch(err){
    res.status(404).send("ERROR " + err.message);
   
   }
})

userRouter.get("/user/connections", userauth, async (req,res) =>{
   try{
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
     $or: [
         { toUserId: loggedInUser._id, status: "accepted" },
         { fromUserId: loggedInUser._id, status: "accepted"}
     ],
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequest
    .map((row) => {
       // Decide which user data to return based on the logged-in user
       if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;  // If logged-in user is the sender, return the receiver's data
       } else {
          return row.fromUserId;  // If logged-in user is the receiver, return the sender's data
       }
    })

    res.json({message: "find connection successfully!",data});
   }
   catch(err){
    req.status(404).send("ERROR " + err.message );
   }
})

module.exports = userRouter;