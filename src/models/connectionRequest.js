

const mongoose  = require("mongoose");

const connectionRequestSchima = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User",
    },
    status:{
        type: String,
        enum: {
            values:["accepted","rejected","ignored","interested"],
            message: `{VALUE} incorrect status type`
        },
    }

});

connectionRequestSchima.pre("save",function(next) {
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("invalid connection");
  };
  next();
})
connectionRequestSchima.index({fromUserId:1 ,toUserId:1})
const ConnnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchima);

module.exports = ConnnectionRequestModel;