const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    stock: { type: Number, required: true },
    image: { type: String },   // ✅ NEW FIELD
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
