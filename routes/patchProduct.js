const express = require('express')
const {productModel} = require('../models/product.model')
const router = express.Router()


function updateProduct({id, payload}){
  return productModel.updateOne({
    _id:id
  },{
    $set: payload
  }).exec()
}


router.patch("/",(req,res)=>{
  const {id, payload} = req.body
  const prodRes = updateProduct({
    id,
    payload
  })
  prodRes
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
  patchProductRouter:router
};