const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Projects = require("../models/projects.model");

const router = express.Router();

router.post("/", async (req, res) => {
    const { title, description, budget, status, client, user } = req.body;

    try {
        const newProject = await Projects.create({
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
        const projects = await Projects.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error while getting all projects" });
    }
});

// Search projects by title
router.get("/search", async (req, res) => {
    const { title } = req.query;

    try {
        const projects = title
            ? await Projects.find({
                  title: { $regex: title.trim(), $options: "i" },
              })
            : await Projects.find();

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
        const project = await Projects.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error while getting a single project" });
    }
});

// Update single project
router.put("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    const { title, description, budget, status, client, user } = req.body;

    try {
        const updatedProject = await Projects.findByIdAndUpdate(
            projectId,
            { title, description, budget, status, client, user },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: `Unable to update project` });
    }
});

// Delete single project
router.delete("/:projectId", async (req, res) => {
    const { projectId } = req.params;

    try {
        const projectToDelete = await Projects.findById(projectId);

        if (!projectToDelete) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Projects.findByIdAndDelete(projectId);
        res.status(200).json({ message: `The project "${projectToDelete.title}" has been successfully deleted.` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

module.exports = router;
