const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Project = require("../models/projects.model");
const Expense = require("../models/expense.model");

router.get("/", isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id;
      console.log("Fetching budget vs expenses for user:", userId);
  
      // Aggregate budgets and expenses
      const projects = await Project.find({ user: userId });
      console.log("Fetched projects:", projects);
  
      const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
      console.log("Total Budget:", totalBudget);
  
      const expenses = await Expense.find({ user: userId });
      console.log("Fetched expenses:", expenses);
  
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      console.log("Total Expenses:", totalExpenses);
  
      res.status(200).json({ totalBudget, totalExpenses });
    } catch (error) {
      console.error("Error calculating global budget vs expenses:", error);
      res.status(500).json({ message: "Error calculating budget vs expenses" });
    }
  });
  
module.exports = router;
