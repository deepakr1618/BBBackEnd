const express = require('express')
const router = express.Router()

const {orderModel} = require('../models/order.model')

function confirmOrder(order_id){
  console.log(order_id)
  return orderModel.findOneAndUpdate({
    _id:order_id
  },{
    $set:{
      orderStatus: "Completed"
    }
  })
}

router.post("/",(req,res)=>{
  console.log("Confirming order  cart")
  console.log(req.body)
  const {orderId} = req.body
  console.log(orderId)
  confirmOrder(orderId)
  .exec()
  .then((data)=>{
    console.log(data)
    res.status(201).json({
      "status":"success",
      "data": data
    })
  })
  .catch((err)=>{
    res.status(500).json({
      "status":"failure",
      "data": err
    })
  })
})

module.exports = {
  confirmOrder:router
}