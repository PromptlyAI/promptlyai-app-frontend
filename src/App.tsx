import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptPage from "./pages/PromptPage";
import SideBar from "./components/side-bar/SideBar";

function App() {
  return (
    <div className="App">
      <SideBar />
      <PromptPage />
    </div>
  );
}

export default App;
