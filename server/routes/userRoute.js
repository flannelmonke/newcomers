const express = require("express");
const {
  createNewUser,
  updateCompletedTasks,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const { getCurrentTask } = require("../controllers/tasksController");

const userRouter = express.Router();

userRouter.post("/new", createNewUser);

userRouter.patch("/update-completed-tasks", updateCompletedTasks);

userRouter.get("/get-user-by-id/:userId", getUserById);

userRouter.get("/get-all", getAllUsers);

//taskId = most recently completeted task's id
//level = most recently completed task's level
userRouter.get("/get-current-task/:taskId", getCurrentTask);

module.exports = { userRouter };
