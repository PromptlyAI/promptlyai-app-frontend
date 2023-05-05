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
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Popup from "./components/Popup/popup";
import { AppContext } from "./context/AppContext";
import VerifyEmail from "./pages/VerificationPages/VerifyEmail";
import SendVerifyEmail from "./pages/VerificationPages/SendVerifyEmail";
import ForgotPassword from "./pages/VerificationPages/ForgotPassword";

interface screenDimensionsProps {
  w: number;
  h: number;
}

function App() {
  const [promptId, setPromptId] = useState<string>("");
  const [historyMode, setHistoryMode] = useState<string>("TEXT");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [reloadHistory, setReloadHistory] = useState<boolean>(false);
  const [screenDimensions, setScreenDimensions] =
    useState<screenDimensionsProps>({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  const [needToSignIn, setNeedToSignIn] = useState<boolean>(false);
  useEffect(() => {
    setScreenDimensions({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  });

  useEffect(() => {
    const handleResize = () =>
      setScreenDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {screenDimensions.w < 1500 ? (
        <div style={{ width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" , background:"#43424f", padding:"10px" }}>
          <label style={{fontWeight:"bold"}}>Please use a bigger screen to access PromptlyLabs.</label>
        </div>
      ) : (
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
                          historyMode,
                          setHistoryMode,
                          showSettings,
                          setShowSettings,
                          showSidebar,
                          setShowSidebar,
                          promptId,
                          setPromptId,
                          screenDimensions,
                          setScreenDimensions,
                          needToSignIn,
                          setNeedToSignIn,
                        }}
                      >
                        <NavigationBar />
                        <SideBar />
                        <PromptPage />
                      </AppContext.Provider>
                    </>
                  }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/loading" element={<IntroPage />} />
                
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/verify-email" element={<VerifyEmail/>}/>
                <Route path="/send-verify-email" element={<SendVerifyEmail/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>


                {/* {showSettings && <SettingsPage />} */}
              </Routes>
            </div>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
