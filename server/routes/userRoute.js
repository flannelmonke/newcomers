const express = require("express");
const { createNewUser, updateCompletedTasks } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/new", createNewUser);

userRouter.patch("/update-completed-tasks", updateCompletedTasks);

module.exports = { userRouter };