// backend/routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "asdasdafasfdaghjjhgfdertyhn"; // Replace with a secure secret in production

// Register new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }

  try {
    console.log("Trying to login");
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      console.log("IDK");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Even idk");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (error) {
    console.log("I m causing error");
    res.status(500).json({ error: "Login failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Trying to login");
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      console.log("IDK");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Even idk");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (error) {
    console.log("I m causing error");
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = router;
