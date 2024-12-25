const express = require("express");
const requestRouter = express.Router();

requestRouter.get("/getconnection",(req,res) =>{
    res.send("connection request send");
})
module.exports = requestRouter;