// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// Enable CORS middleware
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's local URL during development
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

// Index Routes (General routes for the app)
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Client Routes
const clientRoutes = require("./routes/clients.routes");
app.use("/clients", clientRoutes);

// Project Routes
const projectRoutes = require("./routes/projects.routes");
app.use("/projects", projectRoutes);

// Authentication Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes); // Base URL for authentication-related routes

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
