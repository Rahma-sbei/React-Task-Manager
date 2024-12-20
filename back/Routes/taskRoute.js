const express = require("express");
const taskRoute = express.Router();

const {
  postTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
  getOneTask,
} = require("../Controllers/taskController");

taskRoute.get("/tasks", getTasks);
taskRoute.get("/tasks/:id", getOneTask);
taskRoute.post("/tasks", postTask);
taskRoute.delete("/tasks/:id", deleteTask);
taskRoute.patch("/tasks/:id", updateTaskStatus);

module.exports = taskRoute;
