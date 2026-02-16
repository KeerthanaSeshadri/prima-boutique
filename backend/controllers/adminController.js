const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardStats = async (req, res) => {
  try {
    console.log("Admin Dashboard Stats API Called");

    const totalOrders = await Order.countDocuments();

    const totalRevenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue =
      totalRevenueData.length > 0
        ? totalRevenueData[0].totalRevenue
        : 0;

    const totalProducts = await Product.countDocuments();

    const lowStockProducts = await Product.find({
      stock: { $lt: 5 }
    });

    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      lowStockCount: lowStockProducts.length,
      lowStockProducts
    });

  } catch (error) {
    console.log("Dashboard Stats Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDashboardStats };
