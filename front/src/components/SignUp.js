import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../App.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import sImg from "./signUpImage.png";

import axios from "axios";
function SignUp() {
  const url = "http://localhost:8008/api/users";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url, user)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        navigate("/signIn");
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("There was an error!", error);
      });
  };
  return (
    <MDBContainer
      style={{
        backgroundImage: `url('${sImg}')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBCard
        style={{
          maxWidth: "600px",
          borderRadius: "20px",

          backgroundColor: "rgba(32, 33, 46, 0.59)",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
          border: "3px solid #787ea3",
          zIndex: "1",
        }}
      >
        <div
          style={{
            position: "absolute",
            borderRadius: "20px",
            zIndex: "-1",
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
          }}
        ></div>
        <MDBCardBody className="px-4">
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "white",
              fontFamily: "monospace",
              marginLeft: "17px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Create an account
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "35px",
            }}
          >
            <MDBInput
              className="signUpInput"
              size="lg"
              placeholder="Enter username"
              onChange={handleChange}
              id="userName"
            />
            <MDBInput
              className="signUpInput"
              size="lg"
              placeholder="Enter email"
              onChange={handleChange}
              id="email"
            />

            <MDBInput
              className="signUpInput"
              size="lg"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              id="password"
            />
            <Button size="lg" type="submit" className="signbtn">
              Register
            </Button>
            <div className="text-center">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "200",
                  color: "white",
                  letterSpacing: "1.5px",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/signIn"
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#09b392",
                    letterSpacing: "1.5px",
                  }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
export default SignUp;
