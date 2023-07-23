const express=require('express');
const cartRoutes=express.Router()
const CartProductModel=require("../Models/cart.model")
const jwt = require("jsonwebtoken")


const {authenticate} = require("../middlewares/authenticate.middleware")
cartRoutes.get("/abc", (req,res)=>{
    res.send("cart routes")
})

/**
 * @swagger
 * components:
 *   schemas:
 *     cartProductSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         quantity:
 *           type: number
 *           default: 1
 *         price:
 *           type: number
 *         userID:
 *           type: string
 */


/**
 * @swagger
 * /cart/:
 *   get:
 *     summary: This route is get all the  from database.
 *     responses:
 *       200:
 *         description: The list of all the  cart product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cartProductSchema'
 */

// to get products
cartRoutes.get("/",authenticate,async (req,res) => {
          const {userID}=req.body;
             
                try {
                    const user= await CartProductModel.find({userID});
                    res.status(200).send(user)
                } catch (error) {
                    res.status(400).send({"msg":error.message})
                } 
            
        
    
})


/**
 * @swagger
 * /cart/add/:
 *  post:
 *      summary: To add a new product menu to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cartProductSchema'
 *      responses:
 *          200:
 *              description: The cart product was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/cartProductSchema'
 *          500:
 *              description: Some server error
 */

// to add products in cart
cartRoutes.post("/add",authenticate, async (req,res) => {
    const {image,name,price,quantity,userID} = req.body
    let product = await  CartProductModel.find({$and:[{name:name},{userID:userID}]})
    //console.log(req.body,product)
    if(product.length === 0){
        try {
            const cartProd = await new CartProductModel({image,name,price,quantity,userID})
            cartProd.save()
            res.status(200).send({msg:"Product added to cart"})
        } catch (error) {
            res.status(400).send({msg:error.message})
        }
    } else{
        res.send({msg:"product is already in the cart"})
    }
})

/**
* @swagger
* /cart/delete/:cartProductID:
*   delete:
*     summary: To delete a product from the database
*     tags: [posts]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/cartProductSchema'
*     responses:
*       200:
*         description: The cart product was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/cartProductSchema'
*       404:
*         description: The specified product ID does not exist.
*       500:
*          description: Some server error
*/



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

/**
 * @swagger
 * /cart/update/:cartProductID:
 *   put:
 *     summary: To update a cart product in the database
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cartProductSchema'
 *     responses:
 *       200:
 *         description: The product was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartProductSchema'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */

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