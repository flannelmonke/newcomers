const mongoose = require("mongoose");
const Task = require("../models/Task");

//the logic functions

//get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    //send success payload as json
    return res.status(200).json(tasks);
  } catch (error) {
    //fail case
    return res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
    getAllTasks
};
