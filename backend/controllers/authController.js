const User = require("../models/User");
const bcrypt = require("bcrypt");

// Логін через email і пароль
const loginWithEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, data: { userId: user._id, name: user.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Тестовий логін
const testLogin = async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, password: "test" });
  }
  res.json({ success: true, data: { userId: user._id, name: user.name } });
};

module.exports = { loginWithEmailAndPassword, testLogin };
