import React from "react";

function Questioncard(props) {
  return (
    <div className={`quescard`} id={props.id}>
      <h4> {props.question}</h4>
      <div className="queopt" onClick={(e) => props.chooseop(0)} id={0}>
        <span> A. </span>
        <p> {props.opt1} </p>
      </div>
      <div className="queopt" onClick={(e) => props.chooseop(1)} id={1}>
        <span>B. </span>
        <p> {props.opt2} </p>
      </div>
      <div className="queopt" onClick={(e) => props.chooseop(2)} id={2}>
        <span> C. </span>
        <p> {props.opt3} </p>
      </div>
      <div className="queopt" onClick={(e) => props.chooseop(3)} id={3}>
        <span>D. </span>
        <p> {props.opt4} </p>
      </div>
    </div>
  );
}

export default Questioncard;
