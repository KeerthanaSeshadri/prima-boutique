import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/customer/home");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
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

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/customer/register")}
        >
          Register
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

export default CustomerLogin;
