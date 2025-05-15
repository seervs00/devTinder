const mongoose = require("mongoose");
const messageSchima = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const chatSchima = new mongoose.Schema({
    participents:[{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        required:true
    }],
    messages:[messageSchima]
});

const Chat = mongoose.model("Chat",chatSchima);
module.exports = Chat;