const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const {userauth} = require("../middlewares/auth");

requestRouter.post("/request/send/:status/:toUserId", userauth, async (req,res) =>{
   try{
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status; 
      const isAllowedstatus = ["ignored","interested"];

    //   if(fromUserId == toUserId){
    //     return res.status(400).send({message:`invalid request`});
    //   }

     if(!isAllowedstatus.includes(status)){
        return res.status(400).json(
            { message: `invalid status type ${status}`  })
      } 
     
       const toUser= await User.findOne({_id:toUserId});
       if(!toUser){
        return res.status(400).json({message:`invalid request send`});
       }
      const exitingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
      });
      if(exitingConnectionRequest){
        return  res.status(400).json({message: `request alredy sended`});
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });
      const data = await connectionRequest.save();
      res.json({
        message: user.firstName + " is " + status +" the request of " + toUser.firstName, 
        data,
      });
      }
   catch(err){
    res.status(400).send("ERROR " + err.message);
   }
});

requestRouter.post("/request/review/:status/:requestId", userauth, async (req,res) =>{

  //check validation
  //id is correct?
  //loginuser = touserId
  // status
 try{
  const {status, requestId} = req.params;
  const longedInUser = req.user._id;
  const isAllowedstatus = ["rejected", "accepted"];
  if(!isAllowedstatus.includes(status)){
    return res.status(404).json({message:"status invalid"});
  }
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: longedInUser,
    status: "interested"
  });
  if(!connectionRequest){
    return res.status(404).json({message: "something went wrong"});

  }
  connectionRequest.status = status;
  const data = await connectionRequest.save();
  res.json({message:"connection rewuest " + status,data})
 }
 catch(err){
  res.status(404).json("ERROR " + err.message)
 };
})
module.exports = requestRouter;