import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function TaskItem({ task, onDelete }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [status, setStatus] = useState("");

  const url = "http://localhost:8008/api/tasks";

  const getTaskStatus = () => {
    axios
      .get(`http://localhost:8008/api/tasks/${task._id}`)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((err) => {
        console.log("error on getting task", err);
      });
  };

  useEffect(() => {
    getTaskStatus();
  }, [task._id]);
  const toggleStatus = (taskToUpdate) => {
    const upUrl = `${url}/${taskToUpdate._id}`;
    axios
      .patch(upUrl)
      .then((response) => {
        setStatus(response.data.task.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="task-item">
      <div className="task-details">
        <h3>{task.taskName}</h3>
        <p>{task.taskDesc}</p>
      </div>
      <Button className="status" onClick={() => toggleStatus(task)}>
        {status}
      </Button>
      <div className="task-time">
        {new Date(task.deadline).toLocaleDateString("en-UK", options)}
      </div>

      <button className="delete-button" onClick={() => onDelete(task)}>
        🗑️
      </button>
    </div>
  );
}
