import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import axios from "axios";

const Checkout = () => {

  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const total = cart.reduce((acc, item) => {
    const price = item.salePrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/orders/create",
        {
          customerName: formData.name,
          customerEmail: user.email,
          address: formData.address,
          phone: formData.phone,
          cart
        }
      );

      localStorage.removeItem("cart");
      setCart([]);

      navigate("/payment-success");

    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <>


      <div style={{ padding: "40px" }}>
        <h2>Checkout</h2>
        <h3>Total: ₹{total}</h3>

        <div style={{ maxWidth: "400px", display: "grid", gap: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <button
            onClick={handlePayment}
            style={{
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none"
            }}
          >
            Pay & Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
