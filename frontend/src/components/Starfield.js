import React from "react";
import "../CSS/Starfield.css";

const Starfield = ({ children }) => {
  return (
    <div className="starfield">
      <div className="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
      <div className="children">{children}</div>
    </div>
  );
};

export default Starfield;
