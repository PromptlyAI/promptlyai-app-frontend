import React, { useState, useEffect } from "react";
import "./UpgradeSection.css";
import Api from "../../api/Api";
export default function UpgradeButton() {
  const [wordsUsed, setWordsUsed] = useState<number>(0);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await Api({
        path: "user/get-user-info",
        method: "GET",
        token: localStorage.getItem("token") as string,
      });
      const data = await response;
      console.log(data);
      const words = 10000 - data.totalTokenBalance;
      setWordsUsed(words);
    };
    getUserInfo();
  }, []);

  return (
    <div className="upgrade-container">
      <div className="left-upg rade">
        <span> {wordsUsed}/10,000 FREE TOKENS USED</span>
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
