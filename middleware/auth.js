const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(actualToken, "secretkey");

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 NEW: inactive user block
    if (user.status === "inactive") {
      return res.status(403).json({
        message: "User is inactive"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;