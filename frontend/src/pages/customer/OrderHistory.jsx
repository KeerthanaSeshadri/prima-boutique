import React, { useEffect, useState } from "react";
import axios from "axios";


const OrderHistory = () => {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/orders/customer/${user.email}`
    );
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>


      <div style={{ padding: "40px" }}>
        <h2>My Orders</h2>

        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px"
            }}
          >
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} × {item.quantity}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistory;
