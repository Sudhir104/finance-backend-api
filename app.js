const express = require("express");
const app = express();

app.use(express.json());

// ✅ FIXED (correct casing)
const userRoutes = require("./routes/userroutes");
const financeRoutes = require("./routes/financeRoutes");

// ✅ ROUTES (keep consistent naming)
app.use("/api/user", userRoutes);
app.use("/api/finance", financeRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to Finance API");
});

console.log("App loaded");

module.exports = app;