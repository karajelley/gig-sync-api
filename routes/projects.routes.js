const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Client = require("../models/clients.model");
const Project = require("../models/projects.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
    console.log("Received request body:", req.body); // Log request body
    const { title, description, budget, status, client } = req.body;

    try {
        let foundClient = null;

        if (client) {
            foundClient = await Client.findById(client);
            if (!foundClient) {
                return res.status(400).json({ message: "Client not found" });
            }
        }

        // this is checking if a project with the same title already exists (optional)
        const existingProject = await Project.findOne({ title });
        if (existingProject) {
            return res.status(400).json({ message: "A project with this title already exists." });
        }

        // Create new project
        const newProject = await Project.create({
            title,
            description,
            budget,
            status: status || "To Do",
            client: foundClient ? foundClient._id : null,
            user: req.payload,
        });

        if (foundClient) {
            if (!foundClient.project.includes(newProject._id)) {
                foundClient.project.push(newProject._id);
                await foundClient.save();
                console.log(`Project ${newProject._id} linked to client ${foundClient._id}`);
            }
        } else {
            console.log("Project created without a linked client:", newProject);
        }

        res.status(201).json({
            message: `The project titled, ${newProject.title} has been created successfully!`,
            project: newProject,
        });
    } catch (error) {
        console.error("Error while creating a project:", error);
        res.status(500).json({ message: "Error while creating a new project" });
    }
});


// Fetch all projects
router.get("/", isAuthenticated, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.payload._id }).populate("client"); // Populate client details
        res.status(200).json(projects);
    } catch (error) {
        console.log("Error in api projects", error);
        res.status(500).json({ message: "Error while getting all projects" });
    }
});


// Search projects by title
router.get("/search", isAuthenticated, async (req, res) => {
    const { title } = req.query;

    if (!title) {
        const allProjects = await Project.find({ user: req.payload._id });
        return res.status(200).json(allProjects);
      }

    try {
    const project = await Project.find({
        title: {
        $regex: title.trim(),
        $options: "i"
        }
    });

    if (project.length === 0) {
        return res.status(404).json({ message: "No projects found." });
    }

    res.status(200).json(project);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch single project by ID
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("client", "name email") // Populate client info
            .populate({
                path: "expenses",
                select: "description amount category", 
            })
            .exec();

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching project details" });
    }
});


// Update single project
router.put("/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { title, description, budget, status, client, user } = req.body;

    try {
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isClientChanged = client && client !== existingProject.client?.toString();

        if (isClientChanged) {
            if (existingProject.client) {
                await Client.findByIdAndUpdate(existingProject.client, {
                    $pull: { project: id },
                });
                console.log(`Project ${id} removed from old client ${existingProject.client}`);
            }

            if (client) {
                await Client.findByIdAndUpdate(client, {
                    $addToSet: { project: id }, // Prevent duplicate entries
                });
                console.log(`Project ${id} linked to new client ${client}`);
            }
        }

        // Update the project
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, budget, status, client, user },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found after update" });
        }

        console.log(`Project ${id} updated successfully`);
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error("Error while updating project:", error);
        res.status(500).json({ message: "Unable to update project" });
    }
});

// Delete single project
router.delete("/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const projectToDelete = await Project.findById(id);

        if (!projectToDelete) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: `The project ${projectToDelete.title} has been successfully deleted.` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

module.exports = router;
