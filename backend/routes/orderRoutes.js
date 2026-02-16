const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  updateOrderStatus
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/customer/:email", getCustomerOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;
