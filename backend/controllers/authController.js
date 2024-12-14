const User = require("../models/User");
const bcrypt = require("bcrypt");

// Логін через email і пароль
const loginWithEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Login failed: User not found.");
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Login failed: Invalid credentials.");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("Login successful:", user.name);
    res.json({ success: true, data: { userId: user._id, name: user.name } });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Тестовий логін
const testLogin = async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log("Test login attempt with email:", email);
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: "test" });
      console.log("Test user created:", user.name);
    }

    res.json({ success: true, data: { userId: user._id, name: user.name } });
  } catch (error) {
    console.error("Test login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Реєстрація нового користувача
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Registration attempt with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Registration failed: Email already in use.");
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log("Registration successful:", user.name);

    res.status(201).json({ success: true, data: { userId: user._id } });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerUser, loginWithEmailAndPassword, testLogin };
