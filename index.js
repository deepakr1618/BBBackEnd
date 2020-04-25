
const {productModel} = require('./models/product.model.js')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bp = require('body-parser')

const {addProductRouter} = require('./routes/addProduct')
const {addUserRouter} = require('./routes/addUser')


const {getProductsRouter} = require('./routes/getProducts')
const {getUserRouter} = require('./routes/getUser')

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@bigbasketexample-wsjzx.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(bp.urlencoded({extended:false}))
app.use(bp.json())
app.use("/api/products",addProductRouter)
app.use("/api/products",getProductsRouter)
app.use("/api/user",addUserRouter)
app.use("/api/user",getUserRouter)


app.listen(3000,()=>{
  console.log("REST Running at  3000")
})




