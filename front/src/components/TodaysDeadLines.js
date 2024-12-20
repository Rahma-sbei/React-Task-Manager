import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TodaysDeadLines() {
  const fullDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const today = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    })
    .replace(/\//g, "-");

  const [tasks, setTasks] = useState([]);

  const url = "http://localhost:8008/api/tasks";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const deadlines = tasks.filter((task) => task.deadline === today);
  console.log(deadlines);

  return (
    <Card
      style={{
        width: "40vw",
        marginLeft: "4px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "26px",
        height: "35vh",
        backgroundColor: "#17183B",
        backgroundImage:
          "linear-gradient(to right, #080D2A,#17183B,rgba(72, 92, 245, 0.4))",
        backgroundSize: "cover",
        padding: "20px",
        border: "none",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <Card.Title
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            marginTop: "10px",
            marginLeft: "20px",
            marginBottom: "0px",
          }}
        >
          Today's Deadlines
        </Card.Title>
        <Card.Text
          style={{
            fontSize: "13px",
            letterSpacing: "2px",
            fontWeight: "bold",
            color: " #aaa",
            marginTop: "0px",
            marginLeft: "20px",
          }}
        >
          {fullDay}
        </Card.Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "start",
          justifyContent: "flex-start",
          marginLeft: "40px",
          overflowY: "auto",
          padding: "0",
        }}
      >
        {deadlines.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              alignItems: "center",
            }}
          >
            <Card.Text
              style={{ color: "#aaa", fontWeight: "bold", paddingTop: "10px" }}
            >
              {item.taskName}
            </Card.Text>
            <Link to="/Tasks">
              <Button
                variant="outlined-dark"
                style={{
                  backgroundColor: "#582cff",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
              >
                View Task
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
