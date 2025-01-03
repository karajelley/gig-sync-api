const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
      default: "",   
    },
    
  },
  {
    timestamps: true,
  }
);

const Users = model("Users", usersSchema);

module.exports = Users;
