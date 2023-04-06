import React, { useState } from "react";
import "./ProfileBar.css";
import CogWheel from "../../images/CogWheel.png";
import Profile from "../../images/Profile.png";

export default function ProfileBar() {
  const [userName, setUserName] = useState<string>("Butcher Pike");
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
      <img className="settings-btn" src={CogWheel} alt="" />
    </div>
  );
}
