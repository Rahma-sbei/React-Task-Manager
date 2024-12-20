import React from "react";
import WelcomeCard from "./WelcomeCard";
import TodaysDeadLines from "./TodaysDeadLines";
import TaskChart from "./TaskChart";
import MyExpenses from "./MyExpenses";
import Menu from "./Menu";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <WelcomeCard />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "start",
          }}
        >
          <TaskChart />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TodaysDeadLines />
            <MyExpenses />
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
}
