import React from "react";
import "./UpgradeButton.css";
export default function UpgradeButton() {
  return (
    <div className="upgrade-container">
      <div className="left-upgrade">
        <span>5000/10,000 FREE WORDS USED</span>
        <input
          className="slider"
          type="range"
          min="0"
          max="100"
          value="50"
        ></input>
      </div>
      <button className="upgrade">UPGRADE</button>
    </div>
  );
}
