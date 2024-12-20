const mongoose = require("mongoose");

const connectDB = async()=>{
     await mongoose.connect("mongodb+srv://mahendras00b:Mahendra70135%40@node.avpfn.mongodb.net/devTinder")
}
 module.exports = {connectDB}