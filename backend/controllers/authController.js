const User = require("../models/User");

const testLogin = async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }
  res.json({ success: true, data: { userId: user._id } });
};

module.exports = { testLogin };
