const Finance = require("../models/Finance");

// CREATE
const createFinance = async (req, res) => {
  try {
    const record = await Finance.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json({
      message: "Record created",
      record
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getAllFinance = async (req, res) => {
  try {
    const records = await Finance.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SUMMARY
const getSummary = async (req, res) => {
  try {
    const records = await Finance.find({ user: req.user._id });

    let income = 0;
    let expense = 0;

    records.forEach(item => {
      if (item.type === "income") income += item.amount;
      else expense += item.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CATEGORY SUMMARY
const getCategorySummary = async (req, res) => {
  try {
    const data = await Finance.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateFinance = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecord = await Finance.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      message: "Record updated",
      updatedRecord
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await Finance.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      message: "Record deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT ALL
module.exports = {
  createFinance,
  getAllFinance,
  getSummary,
  getCategorySummary,
  updateFinance,
  deleteFinance
};