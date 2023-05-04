const mongoose=require("mongoose")

const adminschema=mongoose.Schema({
    Image:String,
    name:String,
    mobile:String,
    adress:String

})

const adminmodel=mongoose.model("admin",adminschema)


module.exports={adminmodel}