const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {orderModel} = require('../models/order.model')

function getUnconfirmedOrders(){
  return orderModel
  .find({
    orderStatus:"Order Placed"
  })
}

router.post("/", (req,res) =>{
  console.log("Getting unconfirmed orders..");
  getUnconfirmedOrders()
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
  getUnconfirmedOrder:router
}

//test11