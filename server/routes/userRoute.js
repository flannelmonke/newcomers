const express = require("express");
const {
  createNewUser,
  updateCompletedTasks,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/new", createNewUser);

userRouter.patch("/update-completed-tasks", updateCompletedTasks);

userRouter.get("/get-user-by-id/:userId", getUserById);
userRouter.get("/get-all", getAllUsers);

module.exports = { userRouter };
