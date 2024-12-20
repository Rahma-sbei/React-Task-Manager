import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "react-bootstrap";
import { FaCalendar } from "react-icons/fa6";
import Dimg from "./bgsc.png";
import Dimg2 from "./background-body-admin.png";
import Dimg3 from "./cardimgfree.png";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import axios from "axios";
import Divider from "./Divider";

export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    const token = localStorage.getItem("token");
    let id;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        id = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    axios
      .get("http://localhost:8008/api/getEvents")
      .then((res) => {
        console.log(res.data);
        console.log("all Events", res.data);
        const myEvents = res.data.filter((ev) => ev.userId === id);
        setEvents(myEvents);
        console.log("my Events", events);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const addEvent = async () => {
    const token = localStorage.getItem("token");
    let id;
    if (selectedDate && eventName && token) {
      try {
        const decodedToken = jwtDecode(token);
        id = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
      const newEvent = {
        date: selectedDate,
        title: eventName,
        userId: id,
      };
      await axios.post("http://localhost:8008/api/createEvents", newEvent);
      setEvents([...events, newEvent]);
      setEventName("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Card
        style={{
          width: "80%",

          backgroundImage: `url('${Dimg2}')`,
          backgroundSize: "cover",
          borderRadius: "20px",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          border: "none",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              display: "flex",
              marginLeft: "50px",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('${Dimg}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "20px",
            }}
          >
            <FaCalendar size={40} color="white" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              gap: "10px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Card.Title
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                letterSpacing: "3px",
              }}
            >
              My Event Calendar
            </Card.Title>
            <Card.Text style={{ color: "#9D5AFF" }}>
              Select a date to create an event{" "}
            </Card.Text>
          </div>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          paddingRight: "0px",
          gap: "0px",
          width: "90%",
        }}
      >
        <div
          style={{
            backgroundImage: `url('${Dimg3}')`,
            backgroundSize: "cover",
            boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
            width: "160vw",
            borderRadius: "20px",
            border: "2px outset #787ea3",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
          }}
        >
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "600",
                  letterSpacing: "2px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              >
                - {new Date(event.date).toDateString()}: {event.title}
              </span>
              <Divider />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            marginLeft: "80px",
            marginRight: "0px",
          }}
        >
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date }) =>
              events.some(
                (event) =>
                  new Date(event.date).toDateString() === date.toDateString()
              )
                ? "event-marked"
                : ""
            }
          />
          {selectedDate && (
            <div
              style={{
                width: "100%",
                paddingTop: "0px",
                display: "flex",
              }}
            >
              <input
                style={{
                  marginTop: "0px",
                  width: "80%",
                  height: "9vh",
                  backgroundColor: "#131536",
                  border: " 2px solid #a0a0a0",
                  borderTopLeftRadius: " 20px",
                  borderBottomLeftRadius: " 20px",
                  paddingLeft: "20px",
                  color: "white",
                }}
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={handleEventNameChange}
              />
              <button
                style={{
                  height: "9vh",
                  width: "30%",
                  backgroundColor: "#8549FF",
                  padding: " 10px 20px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  borderTopRightRadius: " 20px",
                  borderBottomRightRadius: " 20px",
                  border: "none",
                }}
                onClick={addEvent}
              >
                Add Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
