const express = require("express")
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http")
require("dotenv").config();

app.use(
  cors({
    origin: "*",  // Allow all origins
    credentials: true,  // Allow sending cookies and authentication data with requests
  })
);

 

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");
app.use(express.json());
app.use(cookieParser());
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routers/chat");

app.use("/" ,authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)
app.use("/",chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
 .then( () =>{
    console.log("connection successfully");
    server.listen(5170,()=>{
        console.log("server listen successfully ");

    });
    
 }
 )
 .catch((err) =>{
    console.log("connection faild");
 });