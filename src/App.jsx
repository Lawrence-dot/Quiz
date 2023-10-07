import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./Pages/Question";
import { createContext, useEffect, useState } from "react";
import Welcome from "./Pages/Welcome";

export const Appcontext = createContext();
function App() {
  const [showquiz, setshowquiz] = useState(false);
  const showPreloader = () => {
    let loader = document.getElementById("preloader");
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1000);
  };

  useEffect(() => {
    showPreloader();
  }, []);
  return (
    <Appcontext.Provider value={{ setshowquiz, showPreloader }}>
      <BrowserRouter>
        <div className="App">
          <div className="preloader" id="preloader">
            <div className="preloadcontainer"></div>
            <div className="preloadcontent">
              <img src="./p2.gif" alt="loader" />
            </div>
          </div>
          <div className="App-main">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/Home" element={<Home />} />
              <Route
                path={`/Questions`}
                element={showquiz ? <Question /> : <Home />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Appcontext.Provider>
  );
}

export default App;
