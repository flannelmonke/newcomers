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
const getCurrentTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const mostRecentlyCompletedTask = await Task.findById(taskId);

    if (mostRecentlyCompletedTask) {
      console.log("mostRecentlyCompletedTask: ", mostRecentlyCompletedTask);

      const currentTaskLevel = Number(mostRecentlyCompletedTask.level) + 1;
      console.log("current task level: ", currentTaskLevel);
      const currentTask = await Task.findOne({
        level: currentTaskLevel,
      });

      console.log("currentTask backend: ", currentTask);

      if (currentTask) {
        return res.status(200).json(currentTask);
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

const createNewTask = async (req, res) => {
  const { title, description, level } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      level,
    });

    return res.json(newTask);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

//get completed task
const getCompletedTask = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  console.log("tasks: ", user.tasks);

  return res.json(user.tasks);
};

module.exports = {
  getAllTasks,
  getTaskById,
  getCurrentTask,

  //after complete task, fetch getCurrentTask
  updateCompleteTask,
  getCompletedTask,
  createNewTask,
};
