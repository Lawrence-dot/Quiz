import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Highscore() {
  return (
    <div className="high">
      <div className="home-icon">
        {" "}
        <Link to="/">
          {" "}
          <FaHome />
        </Link>{" "}
      </div>
      <div className="highscore pop text-white">
        <span> High Score:</span>
        <span className="scoretexxt">{localStorage.getItem("highscore")}</span>
      </div>
    </div>
  );
}

export default Highscore;
