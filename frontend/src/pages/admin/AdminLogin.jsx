import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Admin Login Attempt:", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/admin-login",
        formData
      );

      console.log("Admin Login Success:", response.data);

      localStorage.setItem("admin", JSON.stringify(response.data));

      navigate("/admin/dashboard");


    } catch (error) {
      console.log("Admin Login Error:", error.response?.data);
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
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
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px"
  }
};

export default AdminLogin;
