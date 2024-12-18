const express = require("express")
const app = express();

app.listen(3000,()=>{
    console.log("server listen successfully");
});

app.get("/user",(req,res) => {
   res.send({"name":"mahendra seervi"})
})
app.post("/user",(req,res) => {
    res.send("data saved successfully.")
})