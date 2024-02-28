import "./App.css";
import "./Animations.css";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PromptGrad from "./prompt-grad/PromptGrad";
import PromptlyApp from "./promptlyV1/PromptlyApp";

function App() {
  return (
    <div>
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
