const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Project = require("./models/projects.model.js");

const app = express();

//MIDDLEWARE
app.use(express.json());

// Create new project
app.post('/projects', async (req, res, next) => {

    const { title, description, budget, status, client, user } = req.body;

    try {
        const newProject = await Project.create({
            title,
            description,
            budget,
            status,
            client,
            UserActivation,
        });
        console.log(newProject);
        res.status(201).json({ message: `The project titled, "${newProject.title}" has been created successfully!` });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while creating a new project"})
      }
});

// Fetch all projects
app.get('/projects', async (req, res) => {

try {
    const response = await Project.find();
    res.status(200).json(response)
} catch (error) {
    res.status(500).json({message: "Error while getting all projects"})
}
});

// Search Project
app.get("/projects/search", async (req, res) => {
const { title } = req.query;
if (!title) {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
}

try {
    const project = await Project.find({
    title: {
        $regex: title.trim(),
        $options: "i"
    }
    });

    if (!project) {
    return res.status(404).json({ message: "No project found with the given title." });
    }

    res.status(200).json(project);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// Fetch single project
app.get('/projects/:projectId', async (req, res) => {
    const { ProjectId } = req.params;

    try {
        const response = await Project.findById(projectId);
        res.status(200).json(response);

      } catch (error) {
        res.status(500).json({message: "Error while getting a single project"})
      }

});

// Update single project
app.put("/projects/:projectId", async (req, res) => {

    const { projectId } = req.params;
    const { title, description, budget, status, client, user } = req.body;
    const updateProject = {
        title,
        description,
        budget,
        status,
        client,
        user
    };
    
    try {
        const projectResponse = await Project.findByIdAndUpdate(projectId, updateProject, {
        new: true
        } );
        res.status(200).json(projectResponse);
    } catch (error) {
        res.status(500).json({message: `Unable to update ${updateProject.title}`})
    }
    });

    // Delete single project
app.delete('/projects/:projectId', async (req, res) => {

    const { projectId } = req.params;
    
    
    try {
    
        const projectToDelete = await Project.findById(projectId);
    
        
        if (!projectToDelete) {
        return res.status(404).json({ message: "Project not found" }); 
        }
        
        const projectResponse = await Project.findByIdAndDelete(projectId);
    
        res.status(200).json({ message: `The project ${projectToDelete.title} has been successfully deleted.` });
    } catch (error) {
        res.status(500).json({message: "Error deleting project"})
    }
    
    
    });


module.exports = router;