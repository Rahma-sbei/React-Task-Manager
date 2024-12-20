import React, { useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { showContext } from "./FullApp";

import sc from "./bgProfile.png";

export default function TaskChart() {
  const { tasks } = useContext(showContext);

  const countTasksByStatus = () => {
    let complete = 0;
    let incomplete = 0;
    tasks.forEach((task) => {
      if (task.status === "Complete") {
        complete += 1;
      } else {
        incomplete += 1;
      }
    });
    return [complete, incomplete];
  };

  const data = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        label: "Tasks",
        data: countTasksByStatus(),
        backgroundColor: ["rgba(8, 13, 42, 0.78)", "rgba(100, 0, 109, 0.62)"],
        borderWidth: 2,
        borderColor: "white",
        color: "#FFFFF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          margin: 30,
          font: {
            size: 20,
            weight: "bold",
          },
          color: "white",
          boxWidth: 25,
          padding: 40,
        },
      },
    },

    layout: {
      padding: {
        left: 50,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card
      style={{
        width: "52vw",
        display: "flex",
        flexDirection: "column",
        borderRadius: "26px",
        height: "65vh",
        backgroundImage: `url('${sc}')`,
        backgroundSize: "cover",
        paddingBottom: "30px",
        paddingLeft: "25px",
        marginRight: "6px",
        border: "none",
        gap: "10px",
      }}
    >
      <Card.Title
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
          marginTop: "25px",
          marginBottom: "0px",
          marginLeft: "20px",
        }}
      >
        My Task Progress
      </Card.Title>
      <Card.Text
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          color: "#CFCDEB",
          marginTop: "0px",
          marginLeft: "20px",
        }}
      >
        Keep track of your progress to stay motivated !{" "}
      </Card.Text>
      <div
        style={{
          flex: 2,
          height: "50vh",
          paddingTop: "0px",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
}
