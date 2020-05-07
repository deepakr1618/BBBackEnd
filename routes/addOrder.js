const express = require('express')
const router = express.Router()

const {orderModel} = require('../models/order.model')


function saveOrder({buyer,total,cart,address}){
  const order = new orderModel({
    buyer,
    total,
    cart,
    address
  })
  return order.save()
}


router.post("/makeOrder",(req,res)=>{
  const {buyer, total, cart,address} = req.body
  const resSave = saveOrder({buyer, total, cart,address})
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
  addOrderRouter: router
}