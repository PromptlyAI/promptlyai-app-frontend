import React, { useState } from "react";
import ButtonCollection from "../../shared/button-styles/ButtonCollection";
import StyledButton from "../../shared/button-styles/StyledButton";
import "./SideBar.css";
import Logo from "./PromptlyLogo.png";

interface histotyProps {
  title: string;
  path: string;
  pressed: boolean;
  id: number;
}

export default function SideBar() {
  const [promptHistory, setPromptHistory] = useState<histotyProps[]>([
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
    {
      title: "butcher fish",
      path: "slakt",
      pressed: false,
      id: Math.random(),
    },
  ]);

  function pressBtn(_id: number) {
    let arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    );
    setPromptHistory(arr);
  }

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
            />
          </div>
        </div>
        <label htmlFor="">PROMPT HISTORY</label>
        <div
          style={{
            position: "relative",
            height: "fit-content",
            paddingBottom: "50px",
          }}
        >
          <div className="prompt-history-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingTop: "420px",
                paddingBottom: "100px",
              }}
            >
              {promptHistory.map((history) => (
                <StyledButton
                  click={() => {
                    pressBtn(history.id);
                  }}
                  pressed={history.pressed}
                  btnWidth={355}
                  btnHeight={56}
                  btnStyle={2}
                  textColor="white"
                  title={history.title}
                  bookIcon={true}
                  trashIcon={true}
                />
              ))}
            </div>
          </div>
          <div className="bottom-gradient"></div>
          <div className="clear-history-container">
            <StyledButton
              btnWidth={355}
              btnHeight={56}
              btnStyle={2}
              textColor="white"
              title="CLEAR PROMPT HISTORY"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
