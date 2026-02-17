import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Truck, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4000/api/orders"
      );
      setOrders(res.data);
    } catch (e) {
      console.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
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
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Update failed",
        confirmButtonColor: "#B76E79",
      });
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.includes(searchTerm)
  );

  return (
    <div className="admin-orders animate-fade-in">
      <div className="flex-between mb-lg">
        <h2 className="page-title">Order Management</h2>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="orders-container">
        {loading ? (
          <div className="flex-center col-span-full" style={{ padding: "40px", width: "100%" }}>
            <Loader text="Loading orders..." />
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <span className="label">Order ID:</span>
                  <span className="value">#{order._id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="order-body">
                <div className="customer-info">
                  <h4>{order.customerName}</h4>
                  <p className="text-muted text-sm">{order.address}</p>
                  <p className="text-muted text-sm">{order.phone}</p>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-row">
                      <span className="qty">{item.quantity}x</span>
                      <span className="name">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <span className="label">Total Amount</span>
                  <span className="amount">₹{order.totalAmount}</span>
                </div>
              </div>

              <div className="order-footer">
                <div className="status-control">
                  <span className="label">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`status-select ${order.status ? order.status.toLowerCase() : 'pending'}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state text-center p-20 text-muted">
            <p>No orders found.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-box {
            position: relative;
        }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }

        .search-input {
            padding: 10px 10px 10px 35px;
            border: 1px solid var(--border);
            border-radius: var(--radius-btn);
            min-width: 250px;
        }

        .orders-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }

        .order-card {
            background: white;
            border-radius: var(--radius-card);
            border: 1px solid var(--border);
            overflow: hidden;
            transition: box-shadow 0.2s;
        }
        
        .order-card:hover {
            box-shadow: var(--shadow-md);
        }

        .order-header {
            background-color: var(--bg-muted);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
        }

        .order-id .value {
            font-weight: 600;
            color: var(--dark);
            margin-left: 5px;
        }

        .order-body {
            padding: 20px;
        }

        .customer-info {
            margin-bottom: 20px;
        }

        .customer-info h4 {
            margin-bottom: 5px;
            font-size: 1.1rem;
        }

        .order-items {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: var(--radius-sm);
        }

        .order-item-row {
            display: flex;
            gap: 10px;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .qty {
            font-weight: 600;
            color: var(--primary);
        }

        .order-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 15px;
            border-top: 1px solid var(--border);
        }

        .order-total .amount {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--dark);
        }

        .order-footer {
            padding: 15px 20px;
            background-color: #fff;
            border-top: 1px solid var(--border);
        }

        .status-control {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .status-select {
            padding: 6px 12px;
            border-radius: 20px;
            border: 1px solid transparent;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            outline: none;
        }

        .status-select.pending { background: #FFF3E0; color: #EF6C00; }
        .status-select.shipped { background: #E3F2FD; color: #1976D2; }
        .status-select.delivered { background: #E8F5E9; color: #2E7D32; }
        .status-select.cancelled { background: #FFEBEE; color: #C62828; }
      `}</style>
    </div>
  );
};

export default AdminOrders;
