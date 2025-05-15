const crypto = require("crypto")
const socket = require("socket.io");
const Chat = require("../models/chat")
const getSecrateId = ({userId,targetId}) =>{
  return crypto.createHash("sha256")
  .update([userId,targetId].sort().join("_"))
  .digest("hex")
}
const initializeSocket = (server) =>{
    const io = socket(server, {
        cors:{
          origin : "*",
        }
      })
    io.on("connection",(socket) =>{
        //handle chat
        socket.on("joinChat", ({userId,targetId}) =>{
          const roomId  = getSecrateId({userId,targetId});
          console.log(roomId);  
          socket.join(roomId);
        })

        socket.on("sendMessage",
          async({firstName,userId,targetId,text}) =>{
         try{
          const roomId  = getSecrateId({userId,targetId});

          let chat = await Chat.findOne(
            {
            participents:{$all:[userId,targetId]}
          })
          if(!chat){
            chat = new Chat({
              participents:[userId,targetId],
              messages:[]
            })
          }
            chat.messages.push(
              {senderId:userId,
                text
              });
              await chat.save();

          
          
          io.to(roomId).emit("messageReceived",{firstName,text,userId}) 
         }catch(err){
          console.error(err);
         }    
        })
        socket.on("disconnect",()=>{})
    })  
}
module.exports = initializeSocket;