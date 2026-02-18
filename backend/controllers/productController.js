const Product = require("../models/Product");
const addProduct = async (req, res) => {
  try {
    console.log("Add Product API called");

    const { name, category, description, price, salePrice, stock } = req.body;

    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const imagePath = req.files && req.files.image ? req.files.image[0].filename : null;
    const arImagePath = req.files && req.files.arImage ? req.files.arImage[0].filename : null;
    const { arType } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      description,
      price,
      salePrice,
      stock,
      image: imagePath,
      arImage: arImagePath,
      arType: arType || null,
    });

    console.log("Product Added:", newProduct.name);

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.log("Add Product Error:", error.message);
    console.log("Full Error:", error);
    res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }
};
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

const deleteProduct = async (req, res) => {
  try {
    console.log("Delete Product API called");
    console.log("Product ID:", req.params.id);

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product Deleted:", deletedProduct.name);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.log("Delete Product Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  addProduct,
  getProducts,
  deleteProduct, 
};
