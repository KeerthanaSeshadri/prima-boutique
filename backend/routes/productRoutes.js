const express = require("express");
const router = express.Router();
const multer = require("multer");

const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// accept both main image and optional AR image
router.post("/add", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'arImage', maxCount: 1 }
]), addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
