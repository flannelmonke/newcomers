const express = require("express");
const { getAllTasks } = require("../controllers/tasksController");

const tasksRouter = express.Router();

//define routes, and the responsible controllers

//full url path: http://localhost:8000/api/tasks/get-all
tasksRouter.get("/get-all", getAllTasks);

module.exports = { tasksRouter };
