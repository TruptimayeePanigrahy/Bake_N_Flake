const express=require('express');
const productRoute=express.Router()
const ProductModel = require("../Models/product.model")


/**
 * @swagger
 * components:
 *   schemas:
 *     productSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: object
 *           properties:
 *             Flavor:
 *               type: string
 *             Number_of_item:
 *               type: number
 *             Type_of_pastry:
 *               type: string
 *             Type_of_Cream:
 *               type: string
 */

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: This route is get all the  from database.
 *     responses:
 *       200:
 *         description: The list of all the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productSchema'
 */


productRoute.get("/",async(req,res)=>{
    let {page,q,category,sortby,value}=req.query;
    if(sortby){
        
        if(value=='asc'){
            var svalue={[sortby]:1}
        }else{
            var svalue={[sortby]:-1}
        }
    }
    let filter={};
    let pageNumber=page||1;
    let skipitems=(pageNumber-1)*12;
    if(category){
        filter.category=category;
    }
    if(q){
        filter.$or = 
        [ { name: { $regex: q, $options: 'i' } }]
    }
    let product=await ProductModel.find(filter).sort(svalue).skip(skipitems).limit(12);
    let productTotal=await ProductModel.find(filter)
    //res.header({"X-Total-Count":productTotal.length});
    res.send({"Total":productTotal.length,"products":product})
})
productRoute.get("/admin",async (req,res)=>{
    let product=await ProductModel.find()
   // let productTotal=await ProductModel.find(filter)
    //res.header({"X-Total-Count":productTotal.length});
    res.send(product)
})
/**
 * @swagger
 * /product/addproduct/:
 *  post:
 *      summary: To add a new product menu to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/productSchema'
 *      responses:
 *          200:
 *              description: The product was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/productSchema'
 *          500:
 *              description: Some server error
 */

productRoute.post("/addproduct",async (req,res)=>{
    try {
        await ProductModel.insertMany(req.body)
    res.status(200).send({msg:"product added!"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({msg:"server crash!"})
    }
    

})

/**
 * @swagger
 * /products/update/:productID:
 *   put:
 *     summary: To update a product in the database
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productSchema'
 *     responses:
 *       200:
 *         description: The product was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productSchema'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */


productRoute.patch("/update/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
         await ProductModel.findByIdAndUpdate({_id:productID},req.body)
         res.status(200).send({msg:"product updated!"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

/**
* @swagger
* /product/delete/:productID:
*   delete:
*     summary: To delete a product from the database
*     tags: [posts]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/productSchema'
*     responses:
*       200:
*         description: The product was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/productSchema'
*       404:
*         description: The specified product ID does not exist.
*       500:
*          description: Some server error
*/


productRoute.delete("/delete/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
         await ProductModel.findByIdAndDelete({_id:productID})
         res.status(200).send({msg:"product deleted!"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})










module.exports = {productRoute};