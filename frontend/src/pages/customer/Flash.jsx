import React from "react";
import { useNavigate } from "react-router-dom";

const Flash = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>PRIMA BOUTIQUE</h1>
      <p>Select your role</p>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate("/admin/login")} style={styles.button}>
          Admin Login
        </button>

        <button
          onClick={() => navigate("/customer/login")}
          style={styles.button}
        >
          Customer Login
        </button>
      </div>
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
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Flash;
