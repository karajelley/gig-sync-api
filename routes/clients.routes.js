const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const clients = require("../models/clients.model");


const router = express.Router();

// Create a New Client
router.post("/", async (req, res) => {
    const { name, email, phone, company, user } = req.body;

    try {
        const newClient = await Clients.create({ name, email, phone, company, user });
        res.status(201).json({ message: `The client, "${newClient.name}" has been created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while creating a new client" });
    }
});

// Fetch All Clients
router.get("/", async (req, res) => {
    const userId = req.query.user;

    try {
        const clients = await Clients.find({ user: userId });
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching clients" });
    }
});

// Fetch Client by ID
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
    const { name, email, phone, company } = req.body;

    try {
        const updatedClient = await Clients.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, company },
            { new: true, runValidators: true }
        );
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: `The client, "${updatedClient.name}" has been updated successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating client" });
    }
});

// Delete Client
router.delete("/:id", async (req, res) => {
    try {
        const deletedClient = await Clients.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: `The client, "${deletedClient.name}" has been deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting client" });
    }
});

module.exports = router;