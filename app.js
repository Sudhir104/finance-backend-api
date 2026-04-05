const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./routes/userroutes");
const financeRoutes = require("./routes/financeRoutes");
app.use("/api/user", userRoutes);
app.use("/api/finance", financeRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Finance API");
});
console.log("App loaded");
module.exports = app;
