const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    stock: { type: Number, required: true },
    image: { type: String },
    arImage: { type: String },
    arType: {
      type: String,
      enum: ["earring", "chain"],
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
