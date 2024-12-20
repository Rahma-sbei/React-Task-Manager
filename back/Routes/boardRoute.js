const express = require("express");
const boardRoute = express.Router();

const {
  createTaskBoard,
  inviteUser,
  addTask,
  getBoards,
  getBoardUsers,
} = require("../Controllers/boardController");

boardRoute.get("/boards", getBoards);
boardRoute.get("/boardusers/:id", getBoardUsers);
boardRoute.post("/createboards", createTaskBoard);
boardRoute.patch("/invite/:id", inviteUser);
boardRoute.patch("/addTask/:id", addTask);

// taskRoute.delete("/tasks/:id", deleteTask);

// taskRoute.patch("/tasks/:id", updateTaskStatus);

module.exports = boardRoute;
