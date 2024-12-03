const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Clients = require("./models/clients.model.js");


const app = express();
app.use(express.json());

//  a New Client
app.post("/clients", async (req, res) => {
    const { name, email, phone, company, user } = req.body;

    try {
        const newClient = await Client.create({
            name,
            email,
            phone,
            company,
            user,
        });
        console.log(newClient);
        res.status(201).json({ message: `The client, "${newClient.name}" has been created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while creating a new client" });
    }
});

// fetch clients

app.get("/clients", async (req, res) => {
    const userId = req.query.user;

    try{
        const clients = await Client.find ({ user: userId});
        res.status(200).json(clients)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching clients"})
    }
})

// Fetch client by id 

app.get("/clients/:id", async (req, res) => {
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

// update client 

app.put("/clients/:id", async (req, res) => {
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
        res.status(200).json({ message: `The client, "${updatedClient.name}" has been updated successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating client" });
    }
});

// Delete client 

app.delete("/clients/:id", async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: `The client, "${deletedClient.name}" has been deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting client" });
    }
});