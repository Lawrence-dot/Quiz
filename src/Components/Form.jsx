import React, { useEffect, useRef, useState, useContext } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../App";
import axios from "axios";

function Form() {
  const AppContext = useContext(Appcontext);
  const catref = useRef();
  const numref = useRef();
  const deffref = useRef();
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);

  const submiterror = () => {
    alert("Please Fill in all Input fields");
  };

  useEffect(() => {
    (async () => {
      await axios
        .get("https://opentdb.com/api_category.php")
        .then((res) => {
          setcategories(res.data.trivia_categories);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const showque = async () => {
    (async () => {
      await axios
        .get(
          `https://opentdb.com/api.php?amount=${numref.current.value}&category=${catref.current.value}&difficulty=${deffref.current.value}&type=multiple`
        )
        .then((res) => {
          AppContext.showPreloader();
          navigate(`/Questions`, {
            state: { ques: res.data.results, data: numref.current.value },
          });
          AppContext.setshowquiz(true);
        });
    })();
  };

  const submitform = () => {
    catref.current.value !== "" &&
    numref.current.value > 0 &&
    deffref.current.value !== ""
      ? showque()
      : submiterror();
  };
  return (
    <div className="form">
      {" "}
      <div className="formcontainer flex flex-col">
        <div className="formque">
          <span>Select Category</span>
          <select ref={catref}>
            {categories.map((each) => {
              return (
                <option key={each.id} value={each.id}>
                  {each.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="formque">
          <span>No Of Questions</span>
          <select ref={numref}>
            <option value="5"> 5</option>
            <option value="10"> 10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="formque">
          <span>Difficulty Level</span>
          <select ref={deffref}>
            <option value="easy"> Easy</option>
            <option value="medium"> Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="submit">
          <button onClick={submitform} className="submitque">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
