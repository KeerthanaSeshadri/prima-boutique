import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/customer/login");
    } else {
      setName(user.name);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Welcome {name}</h1>
<button onClick={() => navigate("/products")}>
  View Products
</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/cart")}>
  Go To Cart
</button>

    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
};

export default CustomerHome;
