import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/admin/login");
    };

    return (
        <div style={styles.sidebar}>
            <h3 style={styles.heading}>Admin Panel</h3>

            <div style={styles.menu}>
                <div style={styles.menuItem} onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                </div>
                <div style={styles.menuItem} onClick={() => navigate("/admin/orders")}>
                    Orders
                </div>
                <div style={styles.menuItem} onClick={() => navigate("/admin/products")}>
                    Manage Products
                </div>
                <div style={styles.menuItem} onClick={() => navigate("/admin/home")}>
                    Home Settings
                </div>
            </div>

            <div style={styles.bottom}>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: "250px",
        height: "100vh",
        backgroundColor: "#2C2C2C",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
    },
    heading: {
        marginBottom: "40px",
        textAlign: "center",
        color: "#B76E79"
    },
    menu: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    menuItem: {
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
    bottom: {
        marginTop: "auto"
    },
    logoutBtn: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#E53935",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default Sidebar;
