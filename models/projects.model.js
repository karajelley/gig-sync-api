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
            enum: ["In Progress", "Completed", "On Hold"], 
            default: "In Progress",
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client", 
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Project = mongoose.model("Project", projectsSchema);

module.exports = Project;
