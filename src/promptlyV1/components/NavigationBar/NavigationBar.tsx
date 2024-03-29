import React, { useContext, useEffect, useState } from "react";
import "./NavigationBar.css";
import Edit from "../../images/Edit.png";
import ImgBox from "../../images/ImgBox.png";
import Time from "../../images/Time.png";
import MenuBtn from "../../images/MenuBtn.png";
import { useNavigate } from "react-router";
import Api from "../../api/Api";
import { RxExit } from "react-icons/rx";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import { AppContext } from "../../context/AppContext";

export default function NavigationBar() {
  const {
    showSidebar,
    setShowSidebar,
    showSettings,
    setShowSettings,
    historyMode,
    setHistoryMode,
    setReloadHistory,
    setPromptId,
    setNeedToSignIn,
  } = useContext(AppContext);

  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const [rotate, setRotate] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await Api({
        path: "user/get-user-info",
        method: "GET",
        token: localStorage.getItem("token") as string,
      });
      setUserName(await response.name);
    };
    getUserInfo();
  }, []);

  function changeMode(type: string) {
    setPromptId("");
    setHistoryMode(type);
    setReloadHistory(true);
  }
  function logout() {
    localStorage.removeItem("token");
    setNeedToSignIn(true);
    setShowSettings(false);
  }

  return (
    <>
      <div className="navigation-bar-main-container">
        <div
          onClick={() => setRotate(!rotate)}
          className={rotate ? "menu-btn rotate" : "menu-btn"}
        >
          <img src={MenuBtn} alt="" />
        </div>
        <div
          onClick={() => {
            if (rotate !== undefined && rotate === true) {
              logout();
            }
          }}
          className={rotate ? "exit-btn fade-in" : "exit-btn fade-out"}
        >
          <RxExit className="exit-icon mobileNavLogo" />
        </div>
        <div className="nav-btn-container">
          <div
            style={{
              background: historyMode === "TEXT" ? "#605C9D" : "transparent",
              borderRadius: "13px",
            }}
            className="nav-btn"
            onClick={() => changeMode("TEXT")}
          >
            <img className="mobileNavLogo" src={Edit} alt="" />
          </div>
          <div
            style={{
              background: historyMode === "IMAGE" ? "#605C9D" : "transparent",
              borderRadius: "13px",
            }}
            className="nav-btn"
            onClick={() => changeMode("IMAGE")}
          >
            <img className="mobileNavLogo" src={ImgBox} alt="" />
          </div>
          <div className="bottom-border"></div>
          <div
            style={{
              background: showSidebar ? "#605C9D" : "transparent",
              borderRadius: "13px",
            }}
            className="nav-btn"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <img className="mobileNavLogo" src={Time} alt="" />
          </div>
        </div>
        <div className="bottom-pfp">
          <div
            onClick={() => setShowSettings(!showSettings)}
            className="profile-picture"
          >
            {userName?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </>
  );
}
