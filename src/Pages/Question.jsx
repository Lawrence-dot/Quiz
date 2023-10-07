import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Appcontext } from "../App";
import Questioncard from "../Components/Questioncard";
import Solution from "../Components/Solution";
import { FaArrowDown, FaArrowUp, FaHome } from "react-icons/fa";

const Questcontext = createContext();

function Question() {
  const location = useLocation();
  const [quiznumb, setquiznumb] = useState(0);
  const [ques, setques] = useState();
  const [quest, setquest] = useState();
  const [numb, setnumb] = useState();
  const [totalcorrect, settotalcorrect] = useState(0);
  const [quescontainer, setquescontainer] = useState();
  const [scorecontainer, setscorecontainer] = useState();
  const [showans, setshowans] = useState(false);
  const [chosen, setchosen] = useState("");
  const navigate = useNavigate();
  const AppContext = useContext(Appcontext);
  var newarr;

  useEffect(() => {
    setquescontainer(document.getElementById("question"));
    setscorecontainer(document.getElementById("scorecard"));
  }, []);

  const chooseopt = (id) => {
    let opts = Array.from(document.getElementsByClassName("queopt"));
    opts.forEach((each) => {
      each.classList.remove("activeopt");
      Number(each.id) === id && each.classList.add("activeopt");
    });
  };

  useEffect(() => {
    setques(location.state.ques);
    setquest([location.state.ques[0]]);
    setnumb(location.state.ques.length);
  }, [location]);

  const restartquiz = () => {
    setquiznumb(0);
    navigate("/Home");
    quescontainer.classList.add("hidden");
    scorecontainer.classList.add("hidden");
    AppContext.setshowquiz(false);
  };

  const shownext = () => {
    let opts = Array.from(document.getElementsByClassName("queopt"));
    let chosenopt = Array.from(document.getElementsByClassName("activeopt"));
    setquiznumb((quiznumb) => quiznumb + 1);
    if (chosenopt.length > 0) {
      let next = ques[quiznumb + 1];
      quest.pop(0, 1);
      quest.push(next);

      newarr[chosenopt[0].id] === ques[quiznumb].correct_answer &&
        settotalcorrect(totalcorrect + 1);
      opts.forEach((each) => {
        each.classList.remove("activeopt");
      });
      setchosen(newarr[chosenopt[0].id]);
    } else {
      let next = ques[quiznumb + 1];
      quest.pop(0, 1);
      quest.push(next);
    }
  };

  const showscores = () => {
    AppContext.showPreloader();
    quescontainer.classList.add("hidden");
    scorecontainer.classList.remove("hidden");
  };

  const nextquiz = () => {
    quiznumb + 1 < numb ? shownext() : showscores();
  };

  const backquiz = () => {
    setquiznumb(quiznumb - 1);
    let prev = ques[quiznumb - 1];
    quest.pop(0, 1);
    quest.push(prev);
    chosen.length > 1 &&
      chosen === ques[quiznumb - 1].correct_answer &&
      settotalcorrect(totalcorrect - 1);
  };

  return (
    <Questcontext.Provider value={{ setquiznumb }}>
      <div className="q">
        <div className="quescontainer">
          <Link to="/">
            {" "}
            <div className="homeicon">
              <FaHome size="30px" />
            </div>
          </Link>
          <div className="question" id="question">
            <div className="progress">
              <div className="progressbar">
                <div className="bar">
                  <div
                    className="indicator"
                    id={`${Number(numb)}`}
                    style={{
                      width: `${(Number(quiznumb) / Number(numb)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex">
                <span className="qlevel">
                  Question {quiznumb + 1} of {numb}
                </span>
                <span className="restartbtn" onClick={() => restartquiz()}>
                  Restart
                </span>
              </div>
            </div>
            {quest?.length > 0 &&
              quest?.map((each, index) => {
                let arr = [
                  each?.incorrect_answers[0],
                  each?.incorrect_answers[1],
                  each?.incorrect_answers[2],
                  each?.correct_answer,
                ];
                newarr = arr
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value);
                return (
                  <Questioncard
                    key={index}
                    question={each?.question}
                    opt1={newarr[0]}
                    opt2={newarr[1]}
                    opt3={newarr[2]}
                    opt4={newarr[3]}
                    chooseop={chooseopt}
                    id={index}
                  />
                );
              })}

            <div className="next">
              {quiznumb > 0 && <span onClick={() => backquiz()}> Back </span>}
              <span onClick={() => nextquiz()}> Next</span>
            </div>
          </div>
        </div>

        <div className="scorecard hidden" id="scorecard">
          <div className="medal">
            <img src="./medal.jpg" alt="hd" />
          </div>
          <span>
            You Got {totalcorrect} out of {numb}
          </span>
          <div className="playagain">
            <span className="scorerestart" onClick={restartquiz}>
              Play Again
            </span>
          </div>

          <div className="questionssolution">
            <h3 onClick={() => setshowans(!showans)}>
              {" "}
              Correct Answers{" "}
              <span className="showans-arr">
                {showans ? (
                  <FaArrowUp size="10px" />
                ) : (
                  <FaArrowDown size="10px" />
                )}
              </span>{" "}
            </h3>
            {showans &&
              ques?.map((each, index) => {
                return (
                  <Solution
                    key={index}
                    question={each?.question}
                    opt1={each.correct_answer}
                    id={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Questcontext.Provider>
  );
}

export default Question;
