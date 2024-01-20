const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

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

//get task by Id
const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);

    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: "Task Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get next task
const getNextTask = async (req, res) => {
  const { taskId, level } = req.params;

  try {
    const currentTask = await Task.findById(taskId);

    if (currentTask) {
      console.log("currentTask: ", currentTask);

      const nextTaskLevel = Number(level) + 1;
      const nextTask = await Task.find({
        previousTask: currentTask._id,
        level: nextTaskLevel,
      });

      if (nextTask) {
        return res.status(200).json(nextTask);
      } else {
        return res.status(404).json({ message: "Next Task Not found" });
      }
    } else {
      return res.status(404).json({ message: "Task Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update task completed to true
const updateCompleteTask = async (req, res) => {
  const { taskId, completed, userId } = req.body;

  if (!Boolean(completed)) {
    return res.status(500).json({ message: "Completed must be true" });
  }

  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(userId);

    if (task && user) {
      user.task = task._id;

      await user.save();
    } else {
      return res.status(404).json({ message: "Task or User Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
};

const createNewTask = async(req, res ) =>{

  const {title, description, level, previousTask} = req.body


  try {

    const newTask = await Task.create({title, description, level, previousTask})

  
    return res.json(newTask)
  } catch (error) {
    return res.json({message: error.message});
  }
}
module.exports = {
  getAllTasks,
  getTaskById,
  getNextTask,

  //after complete task, fetch getNextTask
  updateCompleteTask,

  createNewTask
};
