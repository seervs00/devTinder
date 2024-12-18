const express = require("express")
const app = express();

app.listen(3000,()=>{
    console.log("server listen successfully");
});
app.use("/test",(req,res)=>{  
    res.send("hello server is respond")
})
app.use("/get",(req,res)=>{
    res.send("hello server is respond")
})
app.use("/",(req,res)=>{
    res.send("hello server is respond")
})