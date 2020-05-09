const express = require('express')
const mongoose = require('mongoose')
const {productModel} = require('../models/product.model')
const {orderModel} = require('../models/order.model')
const router = express.Router()
const {getProductDetails} = require('./getCart')

router.get("/",(req,res)=>{
  orderModel
  .aggregate([
      { "$match" : {"orderStatus":"Order Placed"}},
      { "$lookup" : {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "productInfo"
        }
      }
  ])
  .exec()
  .then((data)=>{
    res.status(201)
    .json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.status(500)
    .json({
      "status":"failure",
      "data":err
    })
  }) 
})







module.exports = {
  getUnconfirmedOrders: router,
}