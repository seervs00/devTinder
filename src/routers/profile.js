const express = require("express");
const profileRouter =express.Router();
const {userauth} = require("../middlewares/auth")

 
profileRouter.get("/profile", userauth ,(req,res) => {
    try{
        const user = req.user;
   
    res.send(user);

    }
    catch (err) {
        res.status(500).send("Error saving user:"+ err.message);
    }

});

module.exports =profileRouter;