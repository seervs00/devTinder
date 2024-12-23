const mongoose = require("mongoose");
var validator = require('validator');

 const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:50,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("email not valid");
        }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password note be strong");
            }
            }
    },
    age: {
        type: Number,
        // required: true,
        min: 15,
        max:100,
        trim: true,
    },
    gender: {
        type: String,
        // required: true,
        trim: true,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        trim: true,
        maxlength:500,
        default:"https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is wrong");
            }
            }
    },
    skills: {
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error("you are not add skills more then 10");
            }
        }
    }

 },{timestamps: true});

 module.exports = mongoose.model("User",userSchema);