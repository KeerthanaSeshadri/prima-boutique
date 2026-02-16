const express = require("express");
const router = express.Router();
const multer = require("multer");

const { addProduct, getProducts } = require("../controllers/productController");

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

router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);

module.exports = router;
