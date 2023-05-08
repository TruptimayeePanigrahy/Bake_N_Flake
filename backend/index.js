const express=require('express');
const Razorpay = require('razorpay')
const path = require('path')
const app=express();
app.use(express.json());
const http=require('http');
const  connection  = require('./db');

const {productRoute}=require('./Routes/product.routes')
const {cartRoutes}=require("./Routes/cart.routes")
const {userRouter}=require("./Routes/User.routes")
const {authenticate}=require("./middlewares/authenticate.middleware")

const {adminrouter}=require("./Routes/admin.route")

//const passport=require("./google_auth")


require("dotenv").config();
const cors=require("cors")


app.use(express.json());
app.use(cors())

const server=http.createServer(app);


// razorpay routes please dont touch these routes
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const PORT = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/success.html'))
})

app.post('/createOrder', (req, res)=>{
    const {amount, currency, receipt, notes} = req.body;
    razorpayInstance.orders.create({amount, currency, receipt, notes},
        (err, order)=>{
            if(!err) {
                console.log(order.id)
                res.json(order)
            } else {
                res.send(err);
            }
        }
    )
});

app.post('/verifyOrder', (req, res)=>{
    const {order_id, payment_id} = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    let hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');
    if(razorpay_signature === generated_signature) {
        res.json({success:true, message:"Payment has been verified"})
    } else {
        res.json({success:false, message:"Payment verification failed"})
    }
});
// ************************************************************************************************//
app.use("/product",productRoute)

app.use("/users",userRouter)

app.use("/cart",cartRoutes)

app.use(authenticate)



//app.use(authenticate)
app.use("/admin",adminrouter)


app.get("/", (req,res)=>{
    res.send("okkkkkkk")
})



// app.get('/auth/google/',
 
//   function(req, res) {
//    console.log(passport.authenticate('google', { scope: ['profile','email'] }))
//     // Successful authentication, redirect home.
//     console.log(req.user);
//     res.redirect("http://127.0.0.1:5501/frontend/html/index.html");
//   });

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login', session:false }),
 

//   );

  app.get("/login",(req,res)=>{
    res.sendFile(__dirname+ "/index.html")
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