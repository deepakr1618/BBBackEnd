const express = require('express')
const router = express.Router()
const {userModel} = require("../models/user.model")
const mongoose = require('mongoose')


router.post("/addToCart",(req,res)=>{
  console.log("Adding to cart")
  const {mUserId , payload} = req.body
  const {productId, quantity} = payload
  console.log(payload)
  userModel.findOneAndUpdate({
      _id: mUserId
    }, {
    $push: { 
      cart: {
        productId,
        quantity
      }
    } 
  },{new:true})
  .exec()
  .then((data)=>{
    res.status(201).json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.status(500).json({
      "status":"failure",
      "data":err
    })
  })
})

module.exports = {
  addToCartRouter : router
}