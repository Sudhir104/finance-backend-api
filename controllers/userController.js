const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ✅ REGISTER
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "viewer"
    });

    // Remove password from response
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      message: "User created successfully",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Account is inactive"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ UPDATE USER STATUS (FIXED)
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({
      message: "User status updated",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ EXPORT (NO ERROR NOW)
module.exports = {
  createUser,
  loginUser,
  updateUserStatus
};