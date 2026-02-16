const Product = require("../models/Product");

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    console.log("Add Product API called");

    const { name, category, description, price, salePrice, stock } = req.body;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const imagePath = req.file ? req.file.filename : null;

    const newProduct = await Product.create({
      name,
      category,
      description,
      price,
      salePrice,
      stock,
      image: imagePath,
    });

    console.log("Product Added:", newProduct.name);

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.log("Add Product Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    console.log("Get Products API called");
    console.log("Query Params:", req.query);

    const { category } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
      console.log("Filtering by category:", category);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    console.log("Products Count:", products.length);

    res.json(products);

  } catch (error) {
    console.log("Get Products Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  addProduct,
  getProducts,
};
