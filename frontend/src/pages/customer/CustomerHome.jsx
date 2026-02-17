import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingBag, LogOut, Package as PackageIcon } from "lucide-react";

const CustomerHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/customer/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="customer-dashboard animate-fade-in">
      <div className="dashboard-header mb-xl text-center">
        <div className="user-avatar mb-md">
          <User size={40} color="var(--primary)" />
        </div>
        <h2 className="page-title">Hello, {user.name}</h2>
        <p className="text-muted">Welcome to your personal account dashboard.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/products")}>
          <div className="icon-box bg-primary-light">
            <ShoppingBag size={24} color="var(--primary)" />
          </div>
          <div>
            <h3>Start Shopping</h3>
            <p>Browse our latest luxury collection.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/my-orders")}>
          <div className="icon-box bg-blue">
            <PackageIcon size={24} color="#2196F3" />
          </div>
          <div>
            <h3>My Orders</h3>
            <p>Track and view your order history.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/cart")}>
          <div className="icon-box bg-purple">
            <ShoppingBag size={24} color="#9C27B0" />
          </div>
          <div>
            <h3>My Bag</h3>
            <p>View items currently in your cart.</p>
          </div>
        </div>

        <div className="dashboard-card" onClick={handleLogout}>
          <div className="icon-box bg-red">
            <LogOut size={24} color="#E53935" />
          </div>
          <div>
            <h3>Sign Out</h3>
            <p>Securely log out of your account.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .customer-dashboard {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 0;
        }

        .user-avatar {
            width: 80px;
            height: 80px;
            background: var(--bg-surface);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: var(--shadow-md);
            border: 2px solid rgba(183, 110, 121, 0.2);
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .dashboard-card {
            background: white;
            padding: 25px;
            border-radius: var(--radius-card);
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 20px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
            border-color: var(--primary);
        }

        .icon-box {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .bg-primary-light { background: rgba(183, 110, 121, 0.1); }
        .bg-blue { background: #E3F2FD; }
        .bg-purple { background: #F3E5F5; }
        .bg-red { background: #FFEBEE; }

        h3 {
            font-size: 1.1rem;
            margin-bottom: 5px;
            color: var(--dark);
        }
        
        p {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin: 0;
        }
      `}</style>
    </div>
  );
};

export default CustomerHome;
