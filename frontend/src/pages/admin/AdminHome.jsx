import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    console.log("Admin LocalStorage:", admin);

    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Admin Logged Out");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Welcome Admin</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px"
  }
};

export default AdminHome;
