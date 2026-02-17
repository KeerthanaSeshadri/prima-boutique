import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Loader from "../../components/common/Loader";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/orders/customer/${user.email}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (String(status).toLowerCase()) {
      case 'delivered': return <CheckCircle size={18} color="var(--success)" />;
      case 'cancelled': return <XCircle size={18} color="var(--danger)" />;
      default: return <Clock size={18} color="var(--warning)" />;
    }
  };

  if (loading) return (
    <div className="flex-center" style={{ minHeight: "60vh" }}>
      <Loader text="Fetching your orders..." />
    </div>
  );

  return (
    <div className="order-history animate-fade-in">
      <h2 className="page-title mb-lg">My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-state text-center p-20 card">
          <Package size={48} className="text-muted mb-md" />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card mb-lg">
              <div className="order-header flex-between">
                <div>
                  <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                  <div className="order-date text-muted text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="order-status flex-center gap-sm">
                  {getStatusIcon(order.status)}
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-body">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item flex-start gap-md">
                    <div className="item-img-placeholder">
                      {/* Image would go here if available in item data */}
                      <Package size={20} color="var(--text-muted)" />
                    </div>
                    <div className="item-info">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price ml-auto font-medium">
                      {/* Price per item not always stored in sub-item, assuming display logic matches cart */}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer flex-between">
                <span className="text-muted">Total Amount</span>
                <span className="total-price">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .order-history {
            max-width: 800px;
            margin: 0 auto;
        }
        .order-card {
            background: white;
            border-radius: var(--radius-card);
            border: 1px solid var(--border);
            overflow: hidden;
        }
        .order-header {
            padding: 15px 20px;
            background: var(--bg-muted);
            border-bottom: 1px solid var(--border);
        }
        .order-id {
            font-weight: 600;
            color: var(--dark);
        }
        .status-badge {
            font-size: 0.85rem;
            font-weight: 500;
            text-transform: capitalize;
        }
        .status-badge.pending { color: var(--warning); }
        .status-badge.delivered { color: var(--success); }
        .status-badge.cancelled { color: var(--danger); }
        
        .order-body {
            padding: 20px;
        }
        .order-item {
            padding-bottom: 15px;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--border-light);
        }
        .order-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
        }
        .item-img-placeholder {
            width: 50px;
            height: 50px;
            background: var(--bg-muted);
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .order-footer {
            padding: 15px 20px;
            border-top: 1px solid var(--border);
            background: #fff;
        }
        .total-price {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;
