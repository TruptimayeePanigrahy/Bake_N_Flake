const express=require("express")

const adminrouter=express.Router()

const {adminmodel}=require("../models/admin.model")

/**
 * @swagger
 * components:
 *   schemas:
 *     adminschema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         image:
 *           type: string
 *         name:
 *           type: string
 *         mobile:
 *           type: string
 *         adress:
 *           type: string
 *         email:
 *           type: string
 */


/**
 * @swagger
 * /admin/adminpost/:
 *  post:
 *      summary: To add a new admin to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/adminschema'
 *      responses:
 *          200:
 *              description: The admin was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/adminschema'
 *          500:
 *              description: Some server error
 */



adminrouter.post("/adminpost",async(req,res)=>{
try {
    const data=req.body
const newadmin=new adminmodel(data)
await newadmin.save()
res.status(200).send("admin added")


} catch (error) {
    console.log(error)
}
})



/**
 * @swagger
 * /admin/getadmin:
 *   get:
 *     summary: This route is get all the admin from database.
 *     responses:
 *       200:
 *         description: The list of all the admins.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/adminschema'
 */

adminrouter.get("/getadmin",async(req,res)=>{
    try {
        let admindata=await adminmodel.find()
        res.status(200).send(admindata)
    } catch (error) {
        console.log(error)
    }
    })
    



module.exports={adminrouter}