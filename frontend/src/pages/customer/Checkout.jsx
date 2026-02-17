import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { ShieldCheck, CreditCard, MapPin, Phone, User, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

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

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.response?.data?.message || "Order failed",
        confirmButtonColor: "#B76E79",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page animate-fade-in">
      <h2 className="page-title">Secure Checkout</h2>

      {loading && <Loader fullScreen text="Processing your secure payment..." />}

      <div className="checkout-layout">
        <div className="checkout-form-container">

          <form onSubmit={handlePayment}>
            {/* Shipping Details */}
            <div className="card mb-lg">
              <div className="section-header flex-start gap-md mb-md border-bottom pb-sm">
                <MapPin className="text-primary" size={20} />
                <h3>Shipping Details</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input indent"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <div className="input-with-icon">
                  <div className="icon" style={{ top: "15px" }}><MapPin size={18} /></div>
                  <textarea
                    name="address"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input indent"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="icon" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input indent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method - Mock IO */}
            <div className="card mb-lg">
              <div className="section-header flex-start gap-md mb-md border-bottom pb-sm">
                <CreditCard className="text-primary" size={20} />
                <h3>Payment Method</h3>
              </div>

              <div className="payment-option selected">
                <div className="radio-circle"></div>
                <span>Online Payment (UPI / Card / NetBanking)</span>
                <span className="badge badge-success ml-auto flex-center gap-sm">
                  <ShieldCheck size={14} /> 100% Secure
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary lg full-width"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${total} & Place Order`}
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <div className="card sticky-top">
            <h3>In Your Bag</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item._id} className="summary-item flex-between gap-md mb-md">
                  <img
                    src={`http://localhost:4000/uploads/${item.image}`}
                    alt={item.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div className="item-txt flex-1">
                    <p className="name font-medium">{item.name}</p>
                    <p className="qty text-muted text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="price font-medium">₹{item.salePrice || item.price}</p>
                </div>
              ))}
            </div>

            <div className="divider my-md bg-border" style={{ height: "1px" }}></div>

            <div className="summary-row flex-between mb-sm text-muted">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row flex-between mb-sm text-muted">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="summary-total flex-between font-bold text-lg mt-md">
              <span>Total Pay</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
            max-width: 1000px;
            margin: 0 auto;
            padding-bottom: 50px;
        }

        .page-title {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2rem;
        }

        .checkout-layout {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 30px;
        }

        @media (max-width: 900px) {
            .checkout-layout {
                grid-template-columns: 1fr;
            }
            .order-summary-sidebar {
                order: -1;
            }
        }

        .input-with-icon {
            position: relative;
        }

        .icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            pointer-events: none;
        }

        .form-input.indent {
            padding-left: 45px;
        }

        .payment-option {
            background-color: var(--bg-surface);
            border: 2px solid var(--primary);
            padding: 15px;
            border-radius: var(--radius-btn);
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            background: rgba(183, 110, 121, 0.05);
        }

        .radio-circle {
            width: 18px;
            height: 18px;
            border: 5px solid var(--primary);
            border-radius: 50%;
            background: white;
        }

        .sticky-top {
            position: sticky;
            top: 100px;
        }

        .full-width {
            width: 100%;
        }

        .lg {
            padding: 15px;
            font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
