const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
  buyer:  { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true },
  total: {type: Number, required:true},
  cart: {type: Array , required:true},
  completed: {type: Boolean, default: false},
  address:{
    houseNo : Number,
    street : String,
    city: String,
    pincode : Number
  }
})

module.exports = {
  orderModel : mongoose.model('order',orderModel)
}