const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        budget: {
            type: Number,
            required: true,
            min: [0, "Budget cannot be negative"],
        },
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Completed",], 
            default: "To Do",
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client", 
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        },
        expenses: [
            {
                description: String,
                amount: Number,
                category: {
                    type: String,
                    enum: ["Travel", "Food", "Leisure", "Transport", "Miscellaneous"],
                }
            }
        ]

    },
    {
        timestamps: true, 
    }
);

const Project = mongoose.model("Project", projectsSchema);

module.exports = Project;
