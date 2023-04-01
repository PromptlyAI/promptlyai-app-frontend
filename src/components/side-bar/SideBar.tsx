import React, { useState } from "react";
import ButtonCollection from "../../shared/button-styles/ButtonCollection";
import StyledButton from "../../shared/button-styles/StyledButton";
import "./SideBar.css";
import Logo from "./PromptlyLogo.png";
interface histotyProps {
  title: string;
  path: string;
}

export default function SideBar() {
  const [promptHistory, setPromptHistory] = useState<histotyProps[]>([
    { title: "butcher fish", path: "slakt" },
    { title: "galen gädda", path: "slakt" },
    { title: "Butcher pike", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
    { title: "butcher fish", path: "slakt" },
  ]);
  return (
    <div className="side-bar-container">
      <div className="logo-container">
        <img src={Logo} alt="" />
      </div>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <label htmlFor="">MODE</label>
          <div className="mode-container">
            <ButtonCollection
              buttonsTitles={["PROMPT-EDITOR", "IMAGE-EDITOR"]}
              //   _styles={display: "flex", flexDirection: "column", gap: "20px"}
            />
          </div>
        </div>
        <label htmlFor="">PROMPT HISTORY</label>
        <div className="prompt-history-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
            }}
          >
            {promptHistory.map((history) => (
              <StyledButton
                btnWidth={355}
                btnHeight={56}
                btnStyle={2}
                textColor="white"
                title={history.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
