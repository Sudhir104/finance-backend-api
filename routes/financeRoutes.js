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
router.post("/", auth, checkRole("admin", "viewer"), createFinance);
router.get("/", auth, getAllFinance);
router.get("/summary", auth, getSummary);
router.get("/category-summary", auth, getCategorySummary);
router.put("/:id", auth, checkRole("admin"), updateFinance);
router.delete("/:id", auth, checkRole("admin"), deleteFinance);
module.exports = router;
