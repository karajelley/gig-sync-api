const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
