require ("dotenv").config();
const mongoose = require("mongoose");

//const MONGO_URI = process.env.MONGODB_URI;

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GigSync";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err.message);
  });
