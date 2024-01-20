const express = require("express");
const { createNewUser, updateCompletedTasks, getUserById } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/new", createNewUser);

userRouter.patch("/update-completed-tasks", updateCompletedTasks);

userRouter.get("/get-user-by-id/:userId", getUserById);

module.exports = { userRouter };