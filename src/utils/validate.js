const validator = require("validator")


const validateSignUpData = (req)=>{
   const {firstName,lastName,password,emailId} = req.body;
   if(!firstName || !lastName){
   throw new Error("name is not valid");
   }
   else if(!validator.isEmail(emailId)){
    throw new Error("email is not valid");
   }
   else if( !validator.isStrongPassword(password)){
    throw new Error("please enter strong password");
   }
}
const validateEditProfileData = (req) =>{
   const editableFields = ["firstName", "lastName", "age", "skills", "about", "gender", " photoUrl"];
   const isValidate = Object.keys(req.body).every((field) => editableFields.includes(field))
   return isValidate;

}
const validateNewPassword = (password) => {
   if( !validator.isStrongPassword(password)){
      throw new Error("please enter strong password");
     }
}

module.exports = {validateSignUpData,
   validateEditProfileData,
   validateNewPassword
}