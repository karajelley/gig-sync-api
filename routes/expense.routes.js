const express = require("express");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Expense = require("../models/expense.model");

const router = express.Router();

// Create Expense
router.post("/", isAuthenticated, async (req, res) => {
    const { amount, category, description, project } = req.body;

    try {
        const newExpense = await Expense.create({
            amount,
            category,
            description,
            project,
            user: req.payload._id, // Link to the authenticated user
        });

        res.status(201).json({
            message: `Expense created successfully!`,
            expense: newExpense,
        });
    } catch (error) {
        console.error("Error while creating expense:", error);
        res.status(500).json({ message: "Error while creating expense" });
    }
});

// Fetch All Expenses (Optional: Filter by project or category)
router.get("/", isAuthenticated, async (req, res) => {
    const { project, category } = req.query;
    const userId = req.payload._id;

    const filter = { user: userId };
    if (project) filter.project = project;
    if (category) filter.category = category;

    try {
        const expenses = await Expense.find(filter)
            .populate("project", "title") // Optional: Populate project details
            .exec();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error while fetching expenses:", error);
        res.status(500).json({ message: "Error while fetching expenses" });
    }
});

// Fetch Expense by ID
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id)
            .populate("project", "title")
            .exec();
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error("Error while fetching expense:", error);
        res.status(500).json({ message: "Error while fetching expense" });
    }
});

// Update Expense
router.put("/:id", isAuthenticated, async (req, res) => {
    const { amount, category, description, project } = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, category, description, project },
            { new: true, runValidators: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            message: "Expense updated successfully!",
            expense: updatedExpense,
        });
    } catch (error) {
        console.error("Error while updating expense:", error);
        res.status(500).json({ message: "Error while updating expense" });
    }
});

// Delete Expense
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            message: `Expense deleted successfully!`,
            expense: deletedExpense,
        });
    } catch (error) {
        console.error("Error while deleting expense:", error);
        res.status(500).json({ message: "Error while deleting expense" });
    }
});

module.exports = router;
