const mongoose = require("mongoose");

const CategoryesfSchema = new mongoose.Schema(
  {
    title: String,
    product_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { versionKey: false }
);
module.exports = mongoose.model("Categoryesf", CategoryesfSchema);
