const mongoose=require('mongoose');

const cartProductSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    userID: String
})


module.exports=mongoose.model("cartProduct",cartProductSchema);