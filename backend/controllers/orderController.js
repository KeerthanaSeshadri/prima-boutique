const Order = require("../models/Order");
const Product = require("../models/Product");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, address, phone, cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    for (let item of cart) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      const price = product.salePrice || product.price;
      totalAmount += price * item.quantity;
    }

    const newOrder = await Order.create({
      customerName,
      customerEmail,
      address,
      phone,
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.salePrice || item.price,
        quantity: item.quantity
      })),
      totalAmount
    });

    res.status(201).json(newOrder);

  } catch (error) {
    console.log("Order Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};


// GET ORDERS BY CUSTOMER
const getCustomerOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ customerEmail: email })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// UPDATE STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be modified"
      });
    }

    if (status === "Cancelled" && order.status !== "Cancelled") {
      for (let item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  updateOrderStatus
};
