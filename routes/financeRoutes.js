const express = require("express");
const router = express.Router();

const {
  createFinance,
  getAllFinance,
  getSummary,
  getCategorySummary,
  updateFinance,
  deleteFinance
} = require("../controllers/financeController");

const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

// CREATE
router.post("/", auth, checkRole("admin", "viewer"), createFinance);

// GET ALL
router.get("/", auth, getAllFinance);

// SUMMARY
router.get("/summary", auth, getSummary);

// CATEGORY SUMMARY
router.get("/category-summary", auth, getCategorySummary);

// UPDATE
router.put("/:id", auth, checkRole("admin"), updateFinance);

// DELETE
router.delete("/:id", auth, checkRole("admin"), deleteFinance);

module.exports = router;