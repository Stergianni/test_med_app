const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Load environment variables
require('dotenv').config();

// Function to generate JWT token
const generateAuthToken = (user) => {
  // Create a payload with user ID and any other required fields
  const payload = {
    id: user._id,
    role: user.role || 'user', // Add role or any other field you need
  };

  // Sign the token with a secret key (stored in an environment variable)
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password before saving (security best practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,  // Save the hashed password
      phone,
    });
    await newUser.save();

    // Generate auth token
    const authToken = generateAuthToken(newUser);

    // Send the token as a response
    res.status(201).json({ authtoken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token upon successful login
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;
