const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Client = require("../models/clients.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
    const { name, email, phone, company } = req.body;

    try {
        const newClient = await Client.create({
            name,
            email,
            phone,
            company,
            user: req.payload
        });

        res.status(201).json({ message: `Client ${newClient.name} created successfully!`, client: newClient });
    } catch (error) {
        res.status(500).json({ message: "Error while creating client" });
    }
});

// Fetch All Clients
router.get("/", isAuthenticated, async (req, res) => {

    const userId = req.payload._id;
    console.log(req.payload)
    console.log(req.payload._id)

    try {
        const clients = await Client.find({ user: userId });
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching clients" });
    }
});

// Search clients by name
router.get("/search", isAuthenticated, async (req, res) => {
    const { name } = req.query;
    const userId = req.payload._id;

    if (!name) {
        const allClients = await Client.find({ user: userId });
        return res.status(200).json(allClients);
      }

    try {
    const client = await Client.find({
        name: {
        $regex: name.trim(),
        $options: "i"
        }
    });

    if (client.length === 0) {
        return res.status(404).json({ message: "No clients found." });
    }

    res.status(200).json(client);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch Client by ID
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching client details" });
    }
});

// Update Client
router.put("/:id", isAuthenticated, async (req, res) => {
    const { name, email, phone, company } = req.body;

    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, company },
            { new: true, runValidators: true }
        );
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: `The client, ${updatedClient.name} has been updated successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating client" });
    }
});

// Delete Client
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: `The client, ${deletedClient.name} has been deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting client" });
    }
});

module.exports = router;