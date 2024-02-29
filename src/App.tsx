import "./App.css";
import "./Animations.css";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PromptGrad from "./prompt-grad/PromptGrad";
import PromptlyApp from "./promptlyV1/PromptlyApp";
import { useEffect, useState } from "react";

function App() {
  const [themeColor, setThemeColor] = useState<string>("255 255 255");
  const [theme, setTheme] = useState<string>("dark-theme");
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-text-color",
      themeColor
    );
  }, [themeColor]);
  function switchTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
    setThemeColor(themeColor === "255 255 255" ? "0 0 0" : "255 255 255");
  }

  return (
    <div className={theme}>
      {/* <button onClick={() => switchTheme()}>ss</button> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/promptly" element={<PromptlyApp />}></Route>
          <Route path="/prompt-grad" element={<PromptGrad />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
