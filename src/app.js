const express = require("express")
const app = express();
const {userauth,adminauth} = require("./middlewares/auth")
app.listen(7777,()=>{
    console.log("server listen successfully");
});

app.use("/admin",adminauth);
app.use("/admin/getalldata",
    (req,res) =>{
        console.log("route handler 1")
       
        res.send("all the data");
       
    
    })

app.use("/admin/deletedata",
    (req,res) =>{
        res.send("delete all the data");
    }
)

app.use("/user",userauth,(req,res) =>{
    res.send("1st")
})
// app.use("/user",(req,res) =>{
//     res.send("1st")
// })
// app.all("/user/auth",(req,res) =>{
//     res.send("2nd")
// })
// app.all("/user/admin",(req,res) =>{
//     res.send("3rd")
// })





// app.use("/user",
//     (req,res,next) =>{
//         console.log("route handler 1")
//         // res.send("1st hendler")
//         next();
//     },
//     (req,res,next) =>{
//         console.log("route handler 2")
//         // res.send("2nd hendler")
//        next()
//     },
//     (req,res,next) =>{
//         console.log("route handler 1")
//         next();
//         // res.send("3rd hendler")
//     },
//     (req,res,next) =>{
//         console.log("route handler 1")
//         next();
//         // res.send("4th hendler")
//     },
//     (req,res,next) =>{
//         console.log("route handler 1")
//         next();
//         res.send("5th hendler")
//     },
//   );

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