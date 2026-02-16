import React from "react";
import { useNavigate } from "react-router-dom";


const PaymentSuccess = () => {

  const navigate = useNavigate();

  return (
    <>


      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Payment Successful 🎉</h2>
        <p>Your order has been placed successfully.</p>

        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default PaymentSuccess;
