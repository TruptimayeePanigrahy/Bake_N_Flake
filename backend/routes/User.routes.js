const express=require("express")
const {JsonWebToken} = require("jsonwebtoken")
const {UserModel}=require("../models/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {blacklist}=require("../models/blacklist")
const {authenticate}=require("../middlewares/authenticate.middleware")
const { adminmodel } = require("../models/admin.model")
const {passport} = require("passport")
const {client} = require("../middlewares/redis")

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


userRouter.get("/logout",(req,res)=>{
    blacklist.push(req.headers?.authorization?.split(" ")[1])

    res.send({msg:"logout successful"})
    })

    res.send({msg:"User logout successful"})
    })



    userRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));
  
    userRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log(req.user)
      const user=req.user
      let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
      let refreshtoken=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6d"})
  
      client.set('token', token, 'EX', 3600);
      client.set('refreshtoken', refreshtoken, 'EX', 3600);
      
      res.send(`<a href="http://127.0.0.1:5501/Front-End/View/index.html?userid=${user._id}" id="myid">abc</a>
      <script>
          let a = document.getElementById('myid')
          a.click()
          console.log(a)
      </script>`)
  
  
  });




module.exports={
    userRouter
}