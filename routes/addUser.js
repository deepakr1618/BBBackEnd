const express = require('express')
const {userModel} = require('../models/user.model')
const router = express.Router()


function saveUser({name,address,firebaseUID,cart=[]}){
  const user = new userModel({
    firebaseUID,
    name,
    address,
    cart
  })
  return user.save()
}


router.post("/",(req,res)=>{
  const {name,address, firebaseUID} = req.body;
  const userRes = saveUser({
    firebaseUID,
    name,
    address
  })
  userRes
  .then((data)=>{
    res.status(201).json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.json(500).json({
      "status":"failure",
      "data":err
    })
  })
})

module.exports = {
  addUserRouter:router
};