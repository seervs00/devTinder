const express = require("express")
const app = express();

app.listen(7777,()=>{
    console.log("server listen successfully");
});

app.use("/user",
    (req,res,next) =>{
        console.log("route handler 1")
        // res.send("1st hendler")
        next();
    },
    (req,res,next) =>{
        console.log("route handler 2")
        // res.send("2nd hendler")
       next()
    },
    (req,res,next) =>{
        console.log("route handler 1")
        next();
        // res.send("3rd hendler")
    },
    (req,res,next) =>{
        console.log("route handler 1")
        next();
        // res.send("4th hendler")
    },
    (req,res,next) =>{
        console.log("route handler 1")
        next();
        res.send("5th hendler")
    },
  );

// app.get("/user",(req,res) => {
//    res.send({"name":"mahendra seervi"})
// })
// app.post("/user",(req,res) => {
//     res.send("data saved successfully.")
// })
// app.get("/user",(req,res) => {
//     console.log(req.query);
//     res.send({"name":"mahendra seervi","age":"20"})
// });
// app.get("/user/:userid/:password",(req,res) => {
//     console.log(req.params);
//     res.send({"name":"mahendra seervi","age":"20"})
// });