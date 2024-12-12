const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Project = require("../models/projects.model");

const router = express.Router();

// Route to calculate and fetch total budget vs expenses
router.get("/budget-expenses", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;

    // Fetch all projects for the user
    const projects = await Project.find({ user: userId });

    // Calculate total budget and expenses
    const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
    const totalExpenses = projects.reduce((sum, project) => {
      const projectExpenses = project.expenses.reduce((expSum, exp) => expSum + exp.amount, 0);
      return sum + projectExpenses;
    }, 0);

    res.status(200).json({ totalBudget, totalExpenses });
  } catch (error) {
    console.error("Error calculating budget vs expenses:", error);
    res.status(500).json({ message: "Error calculating budget vs expenses" });
  }
});

module.exports = router;
