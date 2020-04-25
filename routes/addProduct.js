const express = require('express')
const {productModel} = require('../models/product.model')
const router = express.Router()


function saveProduct({name,price,quantity,description,type,imageUrl='',seller}){
  const prod = new productModel({
    name,
    price,
    quantity,
    description,
    type,
    imageUrl,
    seller
  })
  return prod.save()
}


router.post("/",(req,res)=>{
  const {name , price, quantity, description, type, seller} = req.body;
  const prodRes = saveProduct({
    name,
    price,
    quantity,
    description,
    type,
    seller
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
  addProductRouter:router
};