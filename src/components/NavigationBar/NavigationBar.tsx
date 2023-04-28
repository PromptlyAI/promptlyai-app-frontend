import React, { useContext, useEffect, useState } from "react";
import "./NavigationBar.css";
import Search from "../../images/Search.png";
import ImgBox from "../../images/ImgBox.png";
import Time from "../../images/Time.png";
import MenuBtn from "../../images/MenuBtn.png";
import { useNavigate } from "react-router";
import Api from "../../api/Api";
import { RxExit } from "react-icons/rx";
import { SidebarContext } from "../../context/SidebarContext";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import { SettingsContext } from "../../context/SettingsContext";
import { AppContext } from "../../context/AppContext";

export default function NavigationBar() {
  const { showSidebar, setShowSidebar } = useContext(AppContext);
  const { showSettings, setShowSettings } = useContext(AppContext);

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

  return (
    <>
      {/* {showSettings && <SettingsPage />} */}
      <div className="navigation-bar-main-container">
        <div
          onClick={() => setRotate(!rotate)}
          className={rotate ? "menu-btn rotate" : "menu-btn"}
        >
          <img src={MenuBtn} alt="" />
        </div>
        <div className={rotate ? "exit-btn fade-in" : "exit-btn fade-out"}>
          <RxExit className="exit-icon" />
        </div>
        <div className="nav-btn-container">
          <div
            style={{ background: "#605C9D", borderRadius: "13px" }}
            className="nav-btn"
          >
            <img src={Search} alt="" />
          </div>
          <div className="nav-btn bottom-border">
            <img src={ImgBox} alt="" />
          </div>
          <div
            style={{
              background: showSidebar ? "#605C9D" : "transparent",
              borderRadius: "13px",
            }}
            className="nav-btn"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <img src={Time} alt="" />
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
