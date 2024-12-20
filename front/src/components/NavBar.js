import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Divider from "./Divider";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Navs, Prof } from "./Navs";
import { showContext } from "./FullApp";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import {
  FaUser,
  FaUserTie,
  FaBell,
  FaSearch,
  FaBars,
  FaPlus,
  FaMinus,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { InputGroup, OffcanvasTitle } from "react-bootstrap";

export default function NavBar() {
  const { show, handleShow, handleClose } = useContext(showContext);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);

  const location = useLocation();

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

  const titles = {
    "/Home": "Home Page",
    "/Tasks": "Tasks Manager",
    "/Calendar": "Calendar",
    "/Profile": " My Profile",
    "/Admin": "Admin Dashboard",
    "/TaskBoard": "Create Collaboration Tasks Board",
    "/AllBoards": "View All Task Boards",
    "/Expenses": "My expense manager",
  };
  const currentTitle = titles[location.pathname];
  const url = "http://localhost:8008/api/users";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (userId) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${url}/${userId}`, { headers })
        .then((res) => {
          setRole(res.data.user.role);
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  }, [userId]);

  return (
    <Navbar>
      <Container
        fluid
        style={{
          display: "flex",
          alighnItems: "center",
          justifyContent: "space-between",
          gap: "100px",
          width: "100%",
          padding: "0px 50px",
        }}
      >
        <Navbar.Brand
          style={{ fontSize: "30px", fontWeight: "Bold", color: "white" }}
        >
          {currentTitle}
        </Navbar.Brand>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginTop: "15px",
            marginRight: "30px",
          }}
        >
          {/* <Form style={{ display: "flex" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                
                data-bs-theme="dark"
                aria-label="Search"
              />
              
            </InputGroup>
          </Form> */}

          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {role === "admin" && (
              <Link to="/Admin" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined-dark"
                  style={{
                    outline: "none",
                    paddingTop: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <FaUserTie
                      size={18}
                      style={{ color: "white", marginRight: "10px" }}
                    />
                    <Form.Text
                      style={{
                        color: "white",
                        marginBottom: "6px",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      Admin Dashboard
                    </Form.Text>
                  </div>
                </Button>
              </Link>
            )}

            <Link to="/Profile" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined-dark"
                style={{
                  outline: "none",
                  paddingTop: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <FaUser
                    size={18}
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  <Form.Text
                    style={{
                      color: "white",
                      marginBottom: "6px",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    My Profile
                  </Form.Text>
                </div>
              </Button>
            </Link>

            <Button
              variant="outlined-dark"
              style={{
                outline: "none",
              }}
              onClick={handleShow}
            >
              <FaBars size={18} style={{ color: "white" }} />
            </Button>

            <Offcanvas
              show={show}
              onHide={handleClose}
              data-bs-theme="dark"
              placement="end"
              style={{
                background: "rgba(15, 21, 53, 0.8)",
                borderRadius: "10px",
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px",
                width: "300px",
                marginRight: "20px",
                height: "100vh",
              }}
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <OffcanvasTitle
                style={{
                  color: "white",
                  marginTop: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginLeft: "40px",
                  letterSpacing: "3px",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                Pages
              </OffcanvasTitle>

              <Offcanvas.Body style={{ paddingTop: "3px" }}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "95%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      marginTop: "0px",
                    }}
                  >
                    {Navs.map((navItem) => (
                      <Link
                        to={navItem.path}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined-dark"
                          className="button"
                          onClick={handleClose}
                        >
                          <div>{navItem.icon}</div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {navItem.title}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      marginTop: "-30px",
                    }}
                  >
                    <OffcanvasTitle
                      style={{
                        color: "white",
                        marginTop: "30px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                        letterSpacing: "3px",
                        marginBottom: "20px",
                      }}
                    >
                      Account Pages
                    </OffcanvasTitle>
                    {Prof.map((profItem) => (
                      <Link
                        to={profItem.path}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined-dark"
                          className="button"
                          onClick={handleClose}
                        >
                          <div>{profItem.icon}</div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {profItem.title}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            <NavDropdown
              title={<FaBell size={18} style={{ color: "white" }} />}
              drop="start"
              className="custom-dropdown"
            >
              {events.map((event) => (
                <>
                  <NavDropdown.Item style={{ color: "white" }}>
                    {event.title}
                  </NavDropdown.Item>
                  <NavDropdown.Divider style={{ color: "white" }} />
                </>
              ))}
            </NavDropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
