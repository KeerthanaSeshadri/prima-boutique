const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔐 REGISTER
exports.register = async (req, res) => {
  try {
    console.log("Register API called");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", newUser.email);

    res.status(201).json({
      message: "Registration Successful",
    });

  } catch (error) {
    console.log("Register Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    console.log("Admin Login API called");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (
      email === "primafashionbag@gmail.com" &&
      password === "prima123"
    ) {
      console.log("Admin login successful");

      return res.json({
        role: "admin",
        message: "Admin Login Success"
      });
    }

    console.log("Invalid Admin Credentials");
    res.status(400).json({ message: "Invalid Admin Credentials" });

  } catch (error) {
    console.log("Admin Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};