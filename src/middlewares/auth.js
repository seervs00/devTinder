const adminauth = (req,res,next) =>{
    console.log("check authethication")
    const token = "xyg";
    const isautherize = token === "xyg"
    if(isautherize){
        next()
    }
    else{
        res.status(404).send("unautherize user");
    }
}
const userauth= (req,res,next) =>{
    console.log("check authethication")
    console.log("route handler 1")
    const token = "xyg";
    const isautherize = token === "xyg"
    if(isautherize){
        next();
    }
    else{
        res.status(404).send("unautherize user");
    }
}
module.exports = {userauth,adminauth};