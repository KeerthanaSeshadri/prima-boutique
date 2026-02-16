import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/dashboard"
      );
      setStats(res.data);
    } catch (error) {
      console.log("Fetch Stats Error:", error.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard</h2>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div style={styles.card}>
          <h3>Low Stock Items</h3>
          <p>{stats.lowStockCount}</p>
        </div>
      </div>

      {stats.lowStockProducts.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>Low Stock Products</h3>
          {stats.lowStockProducts.map(product => (
            <div key={product._id}>
              {product.name} — Stock: {product.stock}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  }
};

export default AdminDashboard;
