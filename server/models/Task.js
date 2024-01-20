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

    previousTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",

      required: function(){

        return this.level !== 1
      }

      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
