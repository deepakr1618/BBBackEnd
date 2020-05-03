const express = require('express')
const router = express.Router()
const {userModel} = require("../models/user.model")
const mongoose = require('mongoose')


router.post("/addToCart",(req,res)=>{
  console.log("Adding to cart")
  const {mUserId , payload} = req.body
  const {productId, quantity} = payload
  console.log(payload.productId)
  userModel.find({
    "cart.productId": payload.productId
  })
  .exec()
  .then((data)=>{
    if(data.length>0){
      let newCart = data;
      newCart[0].cart.map((cartItem)=>{
        if(cartItem.productId == productId){
          cartItem.quantity += 1
        }
        return cartItem
      });
      userModel.findOneAndUpdate({
          _id: mUserId
        }, {
          cart: newCart[0].cart
      })
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
    }
    else{
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
    }
  })
  
})

module.exports = {
  addToCartRouter : router
}