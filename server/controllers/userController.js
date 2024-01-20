const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

const createNewUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({ username, email });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCompletedTasks = async (req, res) => {
    const { userId, taskId, videoURL } = req.body;
    try {
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);
        if (task && user) {
            user.completedTasks.push({ taskId, videoURL });
            await user.save();
            return res.status(201).json(user);
        } else {
            return res.status(404).json({ message: "Task or User Not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports = { 
    createNewUser,
    updateCompletedTasks,
 };