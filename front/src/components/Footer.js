import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { Card } from "react-bootstrap";

export default function Footer() {
  return (
    <div
      style={{
        backgroundSize: "cover",
        height: "40px",
        width: "100%",
        paddingLeft: "60px",
        paddingRight: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40px",
        paddingBottom: "10px",
      }}
    >
      <div
        style={{
          marginTop: "22px",
          paddingTop: "0px",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "0px",
        }}
      >
        <Card.Text
          style={{
            fontWeight: "bold",
            color: "#aaa",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "0px",
          }}
        >
          Thank you for using our website
        </Card.Text>

        <Card.Text
          style={{
            fontSize: "10px",
            color: "#aaa",
            display: "flex",
            alignItems: "center",
          }}
        >
          This website is made by : Junior SWE G2 - G3
        </Card.Text>
      </div>
      <FaHandHoldingHeart
        size={25}
        style={{
          marginTop: "7px",
        }}
        color="#aaa"
      />
    </div>
  );
}
