import React, { createContext } from "react";
import Home from "./Home";
import Tasks from "./Tasks";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import MyCalendar from "./Calendar";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import MyProfile from "./MyProfile";
import Admin from "./Admin";
import TaskBoard from "./TaskBoard";
import OneBoard from "./OneBoard";
import AllBoards from "./AllBoards";
import Expenses from "./Expenses";

export const showContext = createContext();

function FullApp() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        axios
          .get("http://localhost:8008/api/tasks")
          .then((response) => {
            const tasksFromDb = response.data;
            const userTasks = tasksFromDb.filter(
              (task) => task.userId === userId
            );
            setTasks(userTasks);
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, []);

  const noNavBarPages = ["/", "/signIn"];
  const location = useLocation();

  return (
    <showContext.Provider value={{ show, handleClose, handleShow, tasks }}>
      <div
        style={{
          background: "#080D2A",
          backgroundImage: `
            radial-gradient(ellipse at center top, #1B1B37 0%, rgba(4, 7, 26, 0.2) 50%),
            radial-gradient(ellipse at 60% 50%, #3436A8 0%, rgba(27, 27, 54, 0.15) 70%),
            radial-gradient(ellipse at center bottom, #485CF5 0%, rgba(4, 7, 26, 0.2) 55%),
            radial-gradient(ellipse at 30% 70%, #485CF5 0%, rgba(27, 27, 54, 0.1) 80%),
            radial-gradient(ellipse at 70% 60%, #3436A8 0%, rgba(4, 7, 26, 0.2) 90%)
          `,
          backgroundSize: "cover",
          minHeight: "100vh",
          margin: "0px",
          padding: "0px",
          paddingBottom: "30px",
        }}
      >
        {!noNavBarPages.includes(location.pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Calendar" element={<MyCalendar />} />
          <Route path="/Profile" element={<MyProfile />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/TaskBoard" element={<TaskBoard />} />
          <Route path="/OneBoard" element={<OneBoard />} />
          <Route path="/AllBoards" element={<AllBoards />} />
          <Route path="/Expenses" element={<Expenses />} />
        </Routes>
        <Footer />
      </div>
    </showContext.Provider>
  );
}

export default FullApp;
