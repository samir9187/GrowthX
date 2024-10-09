const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to validate password strength
const isValidPassword = (password) => {
  // You can adjust the regex according to your requirements
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
  return passwordRegex.test(password);
};

// User and Admin Registration
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Validate password strength
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// User and Admin Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("username role");
    return res.json(admins);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
