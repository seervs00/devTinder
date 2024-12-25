const express = require("express")
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
app.use(express.json());
app.use(cookieParser());

app.use("/" ,authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
connectDB()
 .then( () =>{
    console.log("connection successfully");
    app.listen(7777,()=>{
        console.log("server listen successfully");
    });
    
 }
 )
 .catch((err) =>{
    console.log("connection faild");
 });