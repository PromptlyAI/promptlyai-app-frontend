import React, { useState, useEffect, useContext } from "react";
import ButtonCollection from "../../shared/ButtonStyles/ButtonCollection";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SideBar.css";
import Logo from "../../images/PromptlyLogo.png";
import ProfileBar from "../ProfileBar/ProfileBar";
import Api from "../../api/Api";
import { PromptContext } from "../../context/PromptContext";
import UpgradeButton from "../UpgradeSection/UpgradeSection";
import { SidebarContext } from "../../context/SidebarContext";
import TrashBlack from "../../images/TrashBlack.png";
interface buttonProps {
  input: string;
  path?: string;
  pressed: boolean;
  id: string;
  icon?: string;
  loading: boolean;
  type: string;
}

export default function SideBar() {
  const { setPromptId, promptId } = useContext(PromptContext);
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);

  const [promptHistory, setPromptHistory] = useState<buttonProps[]>(() => []);
  const [promptHistoryLoading, setPromptHistoryLoading] =
    useState<boolean>(false);
  const [modes, setModes] = useState<buttonProps[]>(() => [
    {
      input: "PROMPT-EDITOR",
      path: "",
      pressed: true,
      id: `${Math.round(Math.random() * 100) / 100}`,
      icon: "search",
      loading: false,
      type: "",
    },
    {
      input: "IMAGE-EDITOR",
      path: "",
      pressed: false,
      id: `${Math.round(Math.random() * 100) / 100}`,
      icon: "search",
      loading: false,
      type: "",
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
    setPromptHistoryLoading(true);
    const response = await Api({
      path: "prompt/prompts",
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    const arr: buttonProps[] = await response.map((item: any) => ({
      input: item.input,
      id: item.id,
      pressed: false,
      type: item.type,
    }));
    console.log(await response);

    setPromptHistory([...arr]);
    setPromptHistoryLoading(false);
  }

  function pressHistoryBtn(_id: string) {
    let arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    );
    setPromptHistory(arr);

    //set prompt id --> load prompt
    setPromptId(_id);

    //deselect all mode buttons
    let modeButtons = [...modes];
    modeButtons.map((btn) => (btn.pressed = false));
    setModes(modeButtons);
  }

  function pressModeBtn(_id: string) {
    // let arr = [...modes];
    // arr.map((btn) =>
    //   btn.id === _id ? (btn.pressed = true) : (btn.pressed = false)
    // );
    // setModes(arr);
    setPromptId(_id);

    //deselect all history buttons
    let historyArr = [...promptHistory];
    historyArr.map((btn) => (btn.pressed = false));
    setPromptHistory(historyArr);
  }

  async function deletePrompt(_id: string) {
    const arr = [...promptHistory];
    arr.map((btn) =>
      btn.id === _id ? (btn.loading = true) : (btn.loading = false)
    );
    const response = await Api({
      path: "prompt",
      method: "DELETE",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        promptId: _id,
      },
    });
    console.log(await response);

    const newArr = arr.filter((btn) => btn.id !== _id);
    setPromptHistory(newArr);
  }

  return (
    <div className="side-bar-container">
      <div
        className={
          showSidebar
            ? "show-sidebar-container show-sidebar"
            : "show-sidebar-container hide-sidebar"
        }
      >
        <div className="center">
          <UpgradeButton />
        </div>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div className="mode-container"></div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <StyledButton
              click={() => pressModeBtn("newText")}
              title="new prompt"
              btnStyle={2}
              btnWidth={130}
              btnHeight={50}
            />
            <StyledButton
              click={() => pressModeBtn("newImage")}
              title="new image"
              btnStyle={2}
              btnWidth={130}
              btnHeight={50}
            />
          </div>

          <label htmlFor="">PROMPT HISTORY</label>
          <div
            style={{
              position: "relative",
              height: "fit-content",
            }}
          >
            <div className="prompt-history-container">
              {!promptHistoryLoading ? (
                <>
                  {promptHistory.map((historyBtn) => (
                    <StyledButton
                      key={historyBtn.id}
                      click={() => {
                        pressHistoryBtn(historyBtn.id);
                      }}
                      deleteIconClick={() => {
                        deletePrompt(historyBtn.id);
                      }}
                      pressed={historyBtn.pressed}
                      btnWidth={smallBtnsSize}
                      btnHeight={56}
                      btnStyle={2}
                      textColor="white"
                      title={
                        historyBtn.input
                          ? historyBtn.input.length > 20
                            ? `${historyBtn.input.slice(0, 20)}...`
                            : historyBtn.input
                          : "[untitled]"
                      }
                      bookIcon={true}
                      imgIcon={historyBtn.type === "IMAGE" ? true : false}
                      trashIcon={!historyBtn.loading}
                      animationPopup={true}
                      loading={historyBtn.loading}
                    />
                  ))}
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "15%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <div className="loader"></div>
                </div>
              )}
            </div>
            <div>
              <div className="bottom-gradient"></div>
              <div className="clear-history-container">
                <button
                  onClick={() => console.log("illa.se")}
                  className="clear-btn"
                  style={{ width: bigBtnsSize, height: "56px" }}
                >
                  <img
                    style={{ position: "absolute", left: "15px" }}
                    src={TrashBlack}
                  />
                  CLEAR PROMPT-HISTORY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
