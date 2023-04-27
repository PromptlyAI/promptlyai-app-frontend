import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptPage from "./pages/PromptPage/PromptPage";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import IntroPage from "./pages/IntroPage/IntroPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { PromptContext } from "./context/PromptContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { SidebarContext } from "./context/SidebarContext";
import Popup from "./components/Popup/popup";
import { SettingsContext } from "./context/SettingsContext";

function App() {
  const [promptId, setPromptId] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SettingsContext.Provider
                    value={{ showSettings, setShowSettings }}
                  >
                    <SidebarContext.Provider
                      value={{ showSidebar, setShowSidebar }}
                    >
                      <PromptContext.Provider value={{ promptId, setPromptId }}>
                        <NavigationBar />
                        <SideBar />
                        <PromptPage />
                      </PromptContext.Provider>
                    </SidebarContext.Provider>
                  </SettingsContext.Provider>
                </>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/loading" element={<IntroPage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
            <Route path="/admin" element={<AdminPage />} />
            {/* {showSettings && <SettingsPage />} */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
