const express = require('express')
const mongoose = require('mongoose')
const {productModel} = require('../models/product.model')
const {userModel} = require('../models/user.model')
const router = express.Router()


router.get("/:mUserId",(req,res)=>{
  const {mUserId} = req.params
  userModel
  .aggregate([
    { "$match" : {_id:mongoose.Types.ObjectId(mUserId)} },
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
  getCartRouter: router
}