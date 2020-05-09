const {productModel} = require('./models/product.model.js')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bp = require('body-parser')

const {addProductRouter} = require('./routes/addProduct')
const {addUserRouter} = require('./routes/addUser')
const {addToCartRouter} = require("./routes/addCart")

const {patchProductRouter} = require('./routes/patchProduct')
const {patchCartRouter} = require("./routes/patchCart")

const {getProductsRouter} = require('./routes/getProducts')
const {getUserRouter} = require('./routes/getUser')
const {getCartRouter} = require("./routes/getCart")

const {addOrderRouter} = require("./routes/addOrder")
const {getOrderRouter} = require("./routes/getOrder")


const {getUnconfirmedOrders} = require("./routes/getUnconfirmedOrders")
const {confirmOrderRouter} = require("./routes/confirmOrder")


mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@bigbasketexample-wsjzx.mongodb.net/maindb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept,Authorization")
  next()
})
app.use(bp.urlencoded({extended:false}))
app.use(bp.json())



app.use("/api/products",addProductRouter)
app.use("/api/products",getProductsRouter)
app.use("/api/products",patchProductRouter)
app.use("/api/user",addUserRouter)
app.use("/api/user",getUserRouter)
app.use("/api/cart",addToCartRouter)
app.use("/api/cart",getCartRouter)
app.use("/api/cart",patchCartRouter)
app.use("/api/order",addOrderRouter)
app.use("/api/order",getOrderRouter)
app.use("/api/seller",getUnconfirmedOrders)
app.use("/api/seller",confirmOrderRouter)

app.listen(3000,()=>{
  console.log("REST Running at  3000")
})




