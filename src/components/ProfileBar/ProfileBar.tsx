import React, { useState } from "react";
import "./ProfileBar.css";
import CogWheel from "../../images/CogWheel.png";
import Profile from "../../images/Profile.png";
import { useNavigate } from "react-router";

export default function ProfileBar() {
  const [userName, setUserName] = useState<string>("Butcher Pike");
  const navigate = useNavigate();

  return (
    <div className="profile-bar-container">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img className="profile-picture" src={Profile} alt="" />
        <h2>
          {" "}
          <u>{userName}</u>
        </h2>
      </div>
      <div></div>
      <img
        onClick={() => navigate("/settings")}
        className="settings-btn"
        src={CogWheel}
        alt=""
      />
    </div>
  );
}
