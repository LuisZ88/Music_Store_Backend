const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required:true
          },
      
    },
    { versionKey: false }
  );
  module.exports = mongoose.model("Cart", CartSchema);
  