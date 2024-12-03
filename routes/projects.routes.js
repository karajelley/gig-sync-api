const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Project = require("../models/projects.model");

const router = express.Router();

router.post("/", async (req, res) => {
    const { title, description, budget, status, client, user } = req.body;

    try {
        const newProject = await Project.create({
            title,
            description,
            budget,
            status,
            client,
            user,
        });
        res.status(201).json({ message: `The project titled, "${newProject.title}" has been created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while creating a new project" });
    }
});

// Fetch all projects
router.get("/", async (req, res) => {
    try {
        const response = await Project.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error while getting all projects" });
    }
});

// Search projects by title
router.get("/search", async (req, res) => {
    const { title } = req.query;

    try {
        const projects = title
            ? await Project.find({
                  title: { $regex: title.trim(), $options: "i" },
              })
            : await Project.find();

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch single project by ID
router.get("/:projectId", async (req, res) => {
    const { projectId } = req.params;

    try {
        const response = await Project.findById(projectId);
        if (!response) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error while getting a single project" });
    }
});

// Update single project
router.put("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    const { title, description, budget, status, client, user } = req.body;

    try {
        const projectResponse = await Project.findByIdAndUpdate(
            projectId,
            { title, description, budget, status, client, user },
            { new: true }
        );

        if (!projectResponse) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(projectResponse);
    } catch (error) {
        res.status(500).json({ message: `Unable to update project` });
    }
});

// Delete single project
router.delete("/:projectId", async (req, res) => {
    const { projectId } = req.params;

    try {
        const projectToDelete = await Project.findById(projectId);

        if (!projectToDelete) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ message: `The project "${projectToDelete.title}" has been successfully deleted.` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

module.exports = router;