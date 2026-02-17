import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ShoppingBag, User, LogOut, Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link check
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "var(--bg-surface)",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "all var(--transition-normal)",
        borderBottom: isScrolled ? "1px solid var(--border)" : "none",
        padding: isScrolled ? "15px 0" : "20px 0",
      }}
    >
      <div className="container flex-between">
        {/* Logo */}
        <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--primary)",
              fontSize: "1.8rem",
              margin: 0,
              letterSpacing: "-0.5px"
            }}
          >
            Prima Boutique
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links hidden-mobile" style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Link
            to="/products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
            style={{
              fontWeight: isActive("/products") ? "600" : "400",
              color: isActive("/products") ? "var(--primary)" : "var(--dark)"
            }}
          >
            Shop
          </Link>
          <Link
            to="/my-orders"
            className={`nav-link ${isActive("/my-orders") ? "active" : ""}`}
            style={{
              fontWeight: isActive("/my-orders") ? "600" : "400",
              color: isActive("/my-orders") ? "var(--primary)" : "var(--dark)"
            }}
          >
            Orders
          </Link>
        </div>

        {/* Actions */}
        <div className="nav-actions flex-center gap-lg">

          <div
            className="icon-wrapper"
            onClick={() => navigate("/cart")}
            style={{ position: "relative", cursor: "pointer", color: "var(--dark)" }}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span
                className="cart-badge flex-center"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "var(--primary)",
                  color: "white",
                  fontSize: "11px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  fontWeight: "600"
                }}
              >
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="btn-text flex-center gap-sm"
            style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span className="hidden-mobile">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
