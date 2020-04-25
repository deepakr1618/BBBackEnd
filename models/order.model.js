const mongoose = require('mongoose')

const orderSchema = {
  buyer:  { type: mongoose.Schema.Types.ObjectId, ref="user", required:true },
  total: {type: Number, default:0},
  cart: {type: Array , required=true}

}