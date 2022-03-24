const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  paymentID: {
    type: String,
    required:true
  },
  adress: {
    type: Object,
    required:true
  },
  cart:{
      type:Array,
      default: []
  }
   
 }, { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("Payment", PaymentSchema);
