import React from "react";

function Solution(props) {
  return (
    <div className={`solucard`} id={props.id}>
      <h4> {props.question}</h4>
      <div className="qsolu" onClick={(e) => props.chooseop(0)} id={0}>
        <span> => {props.opt1} </span>
      </div>
    </div>
  );
}

export default Solution;
