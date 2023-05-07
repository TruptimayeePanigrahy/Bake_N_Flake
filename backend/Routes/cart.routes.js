const express=require('express');
const cartRoutes=express.Router()
const CartProductModel=require("../Models/cart.model")
const jwt = require("jsonwebtoken")


const {authenticate} = require("../middlewares/authenticate.middleware")
cartRoutes.get("/abc", (req,res)=>{
    res.send("cart routes")
})



// to get products
cartRoutes.get("/",async (req,res) => {
    const{user}=req.body 
            try {
                const products = await CartProductModel.find({user})
                res.status(200).send(products)
            } catch (error) {
                res.status(400).send({msg:error.message})
            }
        
    
})

// to add products in cart
cartRoutes.post("/add", async (req,res) => {
    const {name} = req.body
    let product = await  CartProductModel.find({name})
    if(product.length === 0){
        try {
            const cartProd = await new CartProductModel(req.body)
            cartProd.save()
            res.status(200).send({msg:"Product added to cart"})
        } catch (error) {
            res.status(400).send({msg:error.message})
        }
    }
})


// to delete product from cart
cartRoutes.delete("/delete/:cartProductID", async (req,res) => {
    const {cartProductID} = req.params

    try {
        await CartProductModel.findByIdAndDelete({_id:cartProductID})
        res.status(200).send({msg:"Product deleted from cart"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

// to update product from cart
cartRoutes.patch("/update/:cartProductID", async (req,res) => {
    const {cartProductID} = req.params

    try {
        await CartProductModel.findByIdAndUpdate({_id:cartProductID},req.body)
        res.status(200).send({msg:"Product has been updated"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})



module.exports = {cartRoutes};