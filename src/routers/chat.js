const express = require("express");
const { userauth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetId",userauth,async(req,res) =>{
    try{
        const {targetId} = req.params;
    const userId = req.user._id;
    let chat = await Chat.findOne({
        participents:{$all:[userId,targetId]}
    }).populate({
        path:"messages.senderId",
        select:"firstName lastName"
    });
    if(!chat){
      chat = new Chat({
        participents:[userId,targetId],
        messages:[]
      })
      await chat.save()
    }
    res.json(chat)
    }
    catch(err){
        res.status(404).json(err);
    }
})

module.exports = chatRouter;