const express=require('express');
const app=express();
const http=require('http');
const  connection  = require('./db');
const productRoute=require('./Models/product.model')
require("dotenv").config();

app.use(express.json());

const server=http.createServer(app);

app.use("/product",productRoute)





server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})