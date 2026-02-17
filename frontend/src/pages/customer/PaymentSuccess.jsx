import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page flex-center animate-fade-in">
      <div className="success-card text-center">
        <div className="icon-wrapper mb-md">
          <CheckCircle size={64} color="var(--success)" />
        </div>

        <h2 className="mb-sm">Order Placed Successfully!</h2>
        <p className="text-muted mb-lg">
          Thank you for shopping with Prima Boutique. Your order has been confirmed and will be shipped shortly.
        </p>

        <div className="actions flex-center gap-md">
          <button
            onClick={() => navigate("/my-orders")}
            className="btn btn-outline"
          >
            View Order
          </button>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-primary"
          >
            Continue Shopping <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
            .payment-success-page {
                min-height: 60vh;
                padding: 40px 20px;
            }
            .success-card {
                background: white;
                padding: 50px;
                border-radius: var(--radius-card);
                box-shadow: var(--shadow-lg);
                max-width: 500px;
                width: 100%;
                border: 1px solid var(--border);
            }
            .icon-wrapper {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                background: rgba(76, 175, 80, 0.1);
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
       `}</style>
    </div>
  );
};

export default PaymentSuccess;
