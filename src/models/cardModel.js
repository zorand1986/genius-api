const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: [true, "Front page is required"],
  },
  back: {
    type: String,
    required: [true, "Back page is required"],
  },
  level: {
    type: Number,
    required: [true, "Level is required"],
    default: 0,
  },
});

module.exports = cardSchema;
