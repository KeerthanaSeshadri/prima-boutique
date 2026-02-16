import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {

  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={styles.navbar}>

      <h2 style={styles.logo} onClick={() => navigate("/products")}>
        Prima Boutique
      </h2>

      <div style={styles.links}>
        <span onClick={() => navigate("/products")}>Shop</span>
        <span onClick={() => navigate("/my-orders")}>My Orders</span>

        <div style={styles.cart} onClick={() => navigate("/cart")}>
          🛒
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </div>

        <span onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}>
          Logout
        </span>
      </div>

    </div>
  );
};

const styles = {
  navbar: {
    background: "#fff",
    padding: "18px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  logo: {
    color: "#B76E79",
    cursor: "pointer"
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontWeight: 500
  },
  cart: {
    position: "relative",
    cursor: "pointer"
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    background: "#B76E79",
    color: "white",
    fontSize: "12px",
    padding: "3px 7px",
    borderRadius: "50%"
  }
};

export default Navbar;
