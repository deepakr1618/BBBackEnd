const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
  firebaseUID : String,
  name:String,
  cart:[{
    productId: { type: mongoose.Schema.Types.ObjectId, ref:"product" , required:true},
    quantity: {type:Number, default:1}
  }],
  address:{
    houseNo : Number,
    street : String,
    city: String,
    pincode : Number
  }
})

module.exports = {
  userModel : mongoose.model('user',userModel)
}