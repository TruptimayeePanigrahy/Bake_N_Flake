const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
   name: String,
   email: String,
   pass: String,
   role:{type:String, default:"User",enum:["User","Admin"]}
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}