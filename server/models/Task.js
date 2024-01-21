const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    //if level alr created, decline
    //if an incremented level is not created yet, remind admin
    level: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
