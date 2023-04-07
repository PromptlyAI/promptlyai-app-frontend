import React, { useState } from "react";
import "./UpgradeSection.css";
export default function UpgradeButton() {
  const [wordsUsed, setWordsUsed] = useState<number>(5000);
  return (
    <div className="upgrade-container">
      <div className="left-upgrade">
        <span>{wordsUsed}/10,000 FREE WORDS USED</span>
        <div className="words-left-bar-container">
          <div
            style={{ width: wordsUsed / 44 }}
            className="words-left-bar"
          ></div>
        </div>
      </div>
      <button className="upgrade-btn">UPGRADE</button>
    </div>
  );
}
