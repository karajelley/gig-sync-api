const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientsSchema = mongoose ({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    company:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
})

const Client = mongoose.model("Client", clientsSchema);

module.exports = Clients;

