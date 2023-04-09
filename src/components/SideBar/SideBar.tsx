import React, { useState, useEffect } from "react";
import ButtonCollection from "../../shared/ButtonStyles/ButtonCollection";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SideBar.css";
import Logo from "../../images/PromptlyLogo.png";
import ProfileBar from "../ProfileBar/ProfileBar";
import Api from "../../api/Api";
interface buttonProps {
  input: string;
  path?: string;
  pressed: boolean;
  id: number;
  icon?: string;
}

export default function SideBar() {
  const [promptHistory, setPromptHistory] = useState<buttonProps[]>(() => []);
  const [modes, setModes] = useState<buttonProps[]>(() => [
    {
      input: "PROMPT-EDITOR",
      path: "",
      pressed: true,
      id: Math.round(Math.random() * 100) / 100,
      icon: "search",
    },
    {
      input: "IMAGE-EDITOR",
      path: "",
      pressed: false,
      id: Math.round(Math.random() * 100) / 100,
      icon: "search",
    },
  ]);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [smallBtnsSize, setSmallBtnSize] = useState<number>(355);
  const [bigBtnsSize, setBigBtnSize] = useState<number>(355);

  useEffect(() => {
    if (screenWidth < 1000) {
      setSmallBtnSize(200);
      setBigBtnSize(250);
      return;
    }
    if (screenWidth < 1200) {
      setSmallBtnSize(300);
      setBigBtnSize(300);
      return;
    }
  }, [screenWidth]);

  useEffect(() => {
    getPromptHistory();

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function getPromptHistory() {
    const response = await Api({
      path: "prompt/prompts",
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    console.log(await response);

    const arr: buttonProps[] = await response.map((item: any) => ({
      input: item.input,
      id: item.id,
      pressed: false,
    }));

    setPromptHistory([...arr]);
  }

  function pressHistoryBtn(_id: number) {
    let arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    );
    setPromptHistory(arr);

    //deselect all mode buttons
    let modeButtons = [...modes];
    modeButtons.map((btn) => (btn.pressed = false));
    setModes(modeButtons);
  }

  function pressModeBtn(_id: number) {
    let arr = [...modes];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    );
    setModes(arr);

    //deselect all history buttons
    let historyArr = [...promptHistory];
    historyArr.map((btn) => (btn.pressed = false));
    setPromptHistory(historyArr);
  }
  return (
    <div className="side-bar-container">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="" />
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
            {modes.map((modeBtn) => (
              <StyledButton
                click={() => {
                  pressModeBtn(modeBtn.id);
                }}
                pressed={modeBtn.pressed}
                btnWidth={bigBtnsSize}
                btnHeight={56}
                btnStyle={2}
                textColor="white"
                title={modeBtn.input}
                customIcon={modeBtn.icon}
                bookIcon={false}
                trashIcon={false}
                arrowIcon={true}
              />
            ))}
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
            {promptHistory.map((historyBtn) => (
              <StyledButton
                key={historyBtn.id}
                click={() => {
                  pressHistoryBtn(historyBtn.id);
                }}
                deleteIconClick={() => {
                  setPromptHistory((prevValue) =>
                    prevValue.splice(historyBtn.id)
                  );
                }}
                pressed={historyBtn.pressed}
                btnWidth={smallBtnsSize}
                btnHeight={56}
                btnStyle={2}
                textColor="white"
                title={historyBtn.input}
                bookIcon={true}
                trashIcon={true}
                animationPopup={true}
              />
            ))}
            {/* </div> */}
          </div>
          <div className="bottom-gradient"></div>
          <div className="clear-history-container">
            <StyledButton
              btnWidth={bigBtnsSize}
              btnHeight={56}
              btnStyle={2}
              textColor="white"
              title="CLEAR PROMPT HISTORY"
              deleteIconClick={() => {}}
              animationPopup={true}
            />
          </div>
        </div>
      </div>
      <ProfileBar />
    </div>
  );
}
