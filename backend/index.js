const express=require('express');
const app=express();
app.use(express.json());
const http=require('http');
const  connection  = require('./db');

const {productRoute}=require('./Routes/product.routes')
const {cartRoutes}=require('./routes/cart.routes')
const {userRouter}=require("./routes/User.routes")
const {authenticate}=require("./middlewares/authenticate.middleware")

const {adminrouter}=require("./routes/admin.route")

const passport=require("./google_auth")


require("dotenv").config();
const cors=require("cors")


app.use(express.json());
app.use(cors())

const server=http.createServer(app);

app.use("/product",productRoute)

app.use("/users",userRouter)
//app.use(authenticate)
app.use("/cart",authenticate,cartRoutes)

//app.use(authenticate)
app.use("/admin",adminrouter)


app.get("/", (req,res)=>{
    res.send("okkkkkkk")
})




  



server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})