const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUserStatus
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/:id/status", auth, checkRole("admin"), updateUserStatus);

module.exports = router;
