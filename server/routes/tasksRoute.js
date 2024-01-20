const express = require("express");
const { getAllTasks, createNewTask, getTaskById, getCompletedTask, } = require("../controllers/tasksController");

const tasksRouter = express.Router();

//define routes, and the responsible controllers

//full url path: http://localhost:8000/api/tasks/get-all
tasksRouter.get("/get-all", getAllTasks);

tasksRouter.get("/get-task-by-id/:taskId",getTaskById);

tasksRouter.post("/new", createNewTask)

tasksRouter.get("/get-completed-tasks/:userId", getCompletedTask)

module.exports = { tasksRouter };
