import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/auth/register", form);
      alert("Registration Successful");
      navigate("/customer/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Register</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit">Register</button>
      </form>

      <p>
        Already have account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/customer/login")}
        >
          Login
        </span>
      </p>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
  },
};

export default CustomerRegister;
