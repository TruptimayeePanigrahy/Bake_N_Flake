const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    category:String,
    description:String,
    flavor:String
})

const ProductModel=mongoose.model("product",productSchema);

module.exports=ProductModel