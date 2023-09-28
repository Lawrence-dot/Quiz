import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../App";

function Welcome() {
  const AppContext = useContext(Appcontext);
  const navigate = useNavigate();
  return (
    <div className="welco">
      <div className="welcome" id="mainpage">
        <div className="welcomeimg">
          <img src="./quiz.png" alt="quiz" />
        </div>
        <div className="welcometext">
          <span>
            {" "}
            1000+ Quiz Questions in different categories, Learn and Build your
            intelligence with a lot of Fun. Enjoy!!!!!!!!!!.
          </span>
        </div>
        <div className="welcomebtn">
          {" "}
          <button
            onClick={() => {
              AppContext.showPreloader();
              navigate("/Home");
            }}
          >
            {" "}
            Start Playing
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
