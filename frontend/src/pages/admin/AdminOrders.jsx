import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/orders"
    );
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/orders/${id}`,
        { status }
      );
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "40px" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Orders</h2>
      </div>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <h4>Customer: {order.customerName}</h4>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

          <p>Status:
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </p>

          <h5>Items:</h5>
          {order.items.map((item, index) => (
            <div key={index}>
              {item.name} × {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
