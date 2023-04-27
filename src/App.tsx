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
import { ReloadHistoryContext } from "./context/ReloadHistoryContext";
import { AppContext } from "./context/AppContext";

function App() {
  const [promptId, setPromptId] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [reloadHistory, setReloadHistory] = useState<boolean>(false);
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AppContext.Provider
                    value={{
                      reloadHistory,
                      setReloadHistory,
                      showSettings,
                      setShowSettings,
                      showSidebar,
                      setShowSidebar,
                      promptId,
                      setPromptId,
                    }}
                  >
                    <NavigationBar />
                    <SideBar />
                    <PromptPage />
                  </AppContext.Provider>
                  {/* <ReloadHistoryContext.Provider
                    value={{ reloadHistory, setReloadHistory }}
                  >
                    <SettingsContext.Provider
                      value={{ showSettings, setShowSettings }}
                    >
                      <SidebarContext.Provider
                        value={{ showSidebar, setShowSidebar }}
                      >
                        <PromptContext.Provider
                          value={{ promptId, setPromptId }}
                        >

                        </PromptContext.Provider>
                      </SidebarContext.Provider>
                    </SettingsContext.Provider>
                  </ReloadHistoryContext.Provider> */}
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
