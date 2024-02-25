import React, { useState, useEffect } from "react";
import "./ProfileBar.css";
import CogWheel from "../../images/CogWheel.png";
import Profile from "../../images/Profile.png";
import { useNavigate } from "react-router";
import Api from "../../api/Api";

export default function ProfileBar() {
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

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
    <div className="profile-bar-container">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div className="profile-picture">
          {userName?.charAt(0).toUpperCase()}
        </div>
        <h2>
          <u>{userName}</u>
        </h2>
      </div>
      <div></div>
      <img
        onClick={() => navigate("/promptly/settings")}
        className="settings-btn"
        src={CogWheel}
        alt=""
      />
    </div>
  );
}
