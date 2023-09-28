import React from "react";
import Form from "../Components/Form";
import "../Styles/Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="homecontent">
        <div className="quizlogo">
          <img src="./quiz.png" alt="logo" />
        </div>
        <Form />
      </div>
    </div>
  );
}

export default Home;
