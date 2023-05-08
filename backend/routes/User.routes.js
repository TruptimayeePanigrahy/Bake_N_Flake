const express=require("express")
const {JsonWebToken} = require("jsonwebtoken")
const {UserModel}=require("../models/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {blacklist}=require("../models/blacklist")
const {authenticate}=require("../middlewares/authenticate.middleware")
const { adminmodel } = require("../models/admin.model")

const {passport} = require("../google_auth")
const {client} = require("../middlewares/redis")
require("dotenv").config()


userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,role}=req.body
    try{
        const userpresent=await UserModel.findOne({email})
        if(userpresent){
            res.send("User Already Present Please Login")
        }
        bcrypt.hash(pass,5,async(err, hash)=> {
            if(err) res.send({"msg":"Something went wrong","error":err.message})
            else{
                const user=new UserModel({name,email,pass:hash,role})
                await user.save()
                res.send({"msg":"New Users has been registred"})
           }
        });


       
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
    
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass}=(req.body)
    try{
        const user=await UserModel.find({email})
        console.log(user);
        if(user.length>0){
        let  aduser=  await adminmodel.find({email})
        bcrypt.compare(pass, user[0].pass,(err, result)=>{
            if(result){
                let token=jwt.sign({userID:user[0]._id},"masai");

              //  console.log(aduser[0].Image);
              if(user[0].role=="Admin"){
                res.send({"msg":"Logged in","token":token,name:user[0].name,role:user[0].role,image:aduser[0].Image})
              }else{
                res.send({"msg":"Logged in","token":token,name:user[0].name,role:user[0].role})

              }
            }
            else{
                res.send({"msg":"wrong credentials"})
            }
        });

    }else{
            res.send({"msg":"please registered first!"})
        }
     }catch(err){
         res.send({"msg":"Something went wrong","error":err.message})
     }
})

userRouter.get("/",(req,res)=>{
    res.send("hii")
})


userRouter.get("/logout",(req,res)=>{
    blacklist.push(req.headers?.authorization?.split(" ")[1])

    res.send({msg:"logout successful"})
    })

   


userRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

    userRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
    function(req, res) {
      
      console.log(req.user)
      const user=req.user
      let name=user.name
      let id=user._id
    
   
   
  

 
      res.send(`<a href="http://127.0.0.1:5501/frontend/html/index.html?userid=${id}&name=${name}">Click here to continue</a>`)
 
  })



userRouter.post("/forgetpassword",async(req,res)=>{
    const {email}=req.body
try {
    const olduser=await UserModel.findOne({email})
if(!olduser){
    return res.send("user not presnt")
}

const secret=process.env.secretekey +olduser.pass
const token=jwt.sign({email:olduser.email,id:olduser._id},secret,{expiresIn:"1d"})


} catch (error) {
    
}
})



module.exports={
    userRouter
}
