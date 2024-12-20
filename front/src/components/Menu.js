import React from "react";
import { FaGear } from "react-icons/fa6";
import { useContext } from "react";
import { showContext } from "./FullApp";

export default function Menu() {
  const { handleShow } = useContext(showContext);

  return (
    <div>
      <button
        style={{
          width: "70px",
          height: "70px",
          position: "fixed",
          bottom: "40px",
          right: "70px",
          padding: "10px 20px",
          backgroundColor: "#09B392",
          color: "white",
          border: "none",
          borderRadius: "40px",
          zIndex: "1000",
          cursor: "pointer",
        }}
        onClick={handleShow}
      >
        <FaGear size={25} />
      </button>
    </div>
  );
}
