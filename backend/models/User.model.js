const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
   name: String,
   email: {
    unique:true,
    type:String
  },
   pass: String,
   role:{
    type:String,
     enum:["User","Admin"],
     default:"User"
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}