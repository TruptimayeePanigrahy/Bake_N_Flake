const express=require('express');
const app=express();
const http=require('http');
const  connection  = require('./db');
const {userRouter}=require("./routes/User.routes")
const {authenticate}=require("./middlewares/authenticate.middleware")
const {adminrouter}=require("./routes/admin.route")
require("dotenv").config();
const cors=require("cors")


app.use(express.json());
app.use(cors())

const server=http.createServer(app);

app.get("/",(req,res)=>{
    res.send("hi!")
})

app.use("/users",userRouter)
//app.use(authenticate)

app.use("/admin",adminrouter)


server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})