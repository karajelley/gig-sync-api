

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageSchema = new Schema(
  {
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model("Image", imageSchema);
