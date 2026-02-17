import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, DollarSign, Package, AlertTriangle } from "lucide-react";
import Loader from "../../components/common/Loader";

const AdminDashboard = () => {
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

  if (!stats) return (
    <div className="flex-center" style={{ minHeight: "80vh" }}>
      <Loader text="Loading dashboard..." />
    </div>
  );

  return (
    <div className="admin-page animate-fade-in">
      <div className="flex-between mb-lg">
        <div>
          <h2 className="page-title">Dashboard Overview</h2>
          <p className="text-muted">Welcome back, Admin</p>
        </div>
        <div className="date-badge">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="icon-box bg-blue">
            <ShoppingBag size={24} color="#2196F3" />
          </div>
          <div>
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">{stats.totalOrders}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box bg-green">
            <DollarSign size={24} color="#4CAF50" />
          </div>
          <div>
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">₹{stats.totalRevenue}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box bg-purple">
            <Package size={24} color="#9C27B0" />
          </div>
          <div>
            <p className="stat-label">Total Products</p>
            <h3 className="stat-value">{stats.totalProducts}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box bg-orange">
            <AlertTriangle size={24} color="#FF9800" />
          </div>
          <div>
            <p className="stat-label">Low Stock Items</p>
            <h3 className="stat-value">{stats.lowStockCount}</h3>
          </div>
        </div>
      </div>

      {stats.lowStockProducts.length > 0 && (
        <div className="section mt-xl">
          <h3 className="section-title mb-md">Low Stock Alerts</h3>
          <div className="table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.lowStockProducts.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td className="font-bold">{product.stock}</td>
                    <td><span className="badge badge-warning">Low Stock</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-page {
            padding: 0;
        }
        
        .page-title {
            font-size: 1.8rem;
            margin-bottom: 5px;
        }

        .date-badge {
            background-color: white;
            padding: 8px 16px;
            border-radius: var(--radius-full);
            border: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
        }

        .stat-card {
            background: white;
            padding: 24px;
            border-radius: var(--radius-card);
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: center;
            gap: 20px;
            transition: transform 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        .icon-box {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bg-blue { background-color: #E3F2FD; }
        .bg-green { background-color: #E8F5E9; }
        .bg-purple { background-color: #F3E5F5; }
        .bg-orange { background-color: #FFF3E0; }

        .stat-label {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--dark);
            margin: 0;
            line-height: 1;
        }

        .table-card {
            background: white;
            border-radius: var(--radius-card);
            box-shadow: var(--shadow-sm);
            overflow: hidden;
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
        }

        .admin-table th, .admin-table td {
            padding: 15px 20px;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }

        .admin-table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: var(--text-muted);
            font-size: 0.85rem;
            text-transform: uppercase;
        }

        .badge-warning {
            background-color: #FFF3E0;
            color: #EF6C00;
            padding: 4px 10px;
            border-radius: var(--radius-badge);
            font-size: 0.8rem;
            font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
