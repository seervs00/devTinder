const express = require("express");
const { userauth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";

userRouter.get("/user/requests/received", userauth, async (req,res) =>{
   try{
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId",USER_SAFE_DATA);
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

userRouter.get("/feed", userauth, async (req, res) =>{
try{
   const page = Math.max(parseInt(req.query.page) || 1, 1); // Ensure `page` is at least 1
   let limit = Math.min(parseInt(req.query.limit) || 10, 30); // Default to 10, max limit of 30


   const skip = (page - 1) * (limit);

   const loggedInUser = req.user;

   const connectionRequest = await ConnectionRequest.find(
      {
      $or: [
         {fromUserId:loggedInUser._id}, {toUserId: loggedInUser}
      ],
   })
   .select("fromUserId toUserId")


   const hideUserFromFeed = new Set();
   connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
      
   });

   const data = await User.find({
      $and :[
         {_id: {$nin :Array.from(hideUserFromFeed)}},
         {_id: {$ne: loggedInUser._id}}
      ]
   }).select(USER_SAFE_DATA)
    .skip(skip)
   .limit(limit);
   res.json({message:"feed user to see profile",data});
}
catch(err){
   res.status(404).json({message: "something went wrong "});
}

})

module.exports = userRouter;