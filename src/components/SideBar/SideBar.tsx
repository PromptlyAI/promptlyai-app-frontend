import React, { useState, useEffect, useContext } from "react";
import ButtonCollection from "../../shared/ButtonStyles/ButtonCollection";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SideBar.css";
import Logo from "../../images/PromptlyLogo.png";
import ProfileBar from "../ProfileBar/ProfileBar";
import Api from "../../api/Api";
import UpgradeButton from "../UpgradeSection/UpgradeSection";
import TrashBlack from "../../images/TrashBlack.png";
import { AppContext } from "../../context/AppContext";
import TextHistory from "../TextHistory/PromptHistory";
import PromptHistory from "../TextHistory/PromptHistory";
interface promptHistoryProps {
  input: string;
  path?: string;
  pressed: boolean;
  id: string;
  icon?: string;
  loading: boolean;
  type: string;
}

export default function SideBar() {
  const {
    setPromptId,
    promptId,
    showSidebar,
    setShowSidebar,
    reloadHistory,
    setReloadHistory,
    historyMode,
    screenDimensions,
  } = useContext(AppContext);

  const [promptHistory, setPromptHistory] = useState<promptHistoryProps[]>(
    () => []
  );
  const [promptHistoryLoading, setPromptHistoryLoading] =
    useState<boolean>(false);
  const [clearLoading, setClearLoading] = useState<boolean>(false);

  const [modes, setModes] = useState<promptHistoryProps[]>(() => [
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
  // const [smallBtnsSize, setSmallBtnSize] = useState<number>(355);
  // const [bigBtnsSize, setBigBtnSize] = useState<number>(355);

  // useEffect(() => {
  //   if (screenWidth < 1000) {
  //     setSmallBtnSize(200);
  //     setBigBtnSize(250);
  //     return;
  //   }
  //   if (screenWidth < 1200) {
  //     setSmallBtnSize(300);
  //     setBigBtnSize(300);
  //     return;
  //   }
  // }, [screenWidth]);

  useEffect(() => {
    getPromptHistory();

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (reloadHistory === true) {
      // fastReload();
      getPromptHistory();
      setReloadHistory(false);
    }
  }, [reloadHistory]);

  async function fastReload() {
    const response = await Api({
      path: `prompt/prompts?type=${historyMode}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    const arr: promptHistoryProps[] = await response.map((item: any) => ({
      input: item.input,
      id: item.id,
      pressed: false,
      type: item.type,
    }));

    setPromptHistory([...arr]);
  }

  async function getPromptHistory() {
    setPromptHistoryLoading(true);

    const response = await Api({
      path: `prompt/prompts?type=${historyMode}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    const arr: promptHistoryProps[] = await response.map((item: any) => ({
      input: item.input,
      id: item.id,
      pressed: false,
      type: item.type,
    }));
    console.log(await response);

    setPromptHistory([...arr]);
    setPromptHistoryLoading(false);
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

  // async function deletePrompt(_id: string) {
  //   const arr = [...promptHistory];
  //   arr.map((btn) =>
  //     btn.id === _id ? (btn.loading = true) : (btn.loading = false)
  //   );
  //   const response = await Api({
  //     path: "prompt",
  //     method: "DELETE",
  //     token: localStorage.getItem("token") as string,
  //     bodyParams: {
  //       promptId: _id,
  //     },
  //   });
  //   console.log(await response);

  //   const newArr = arr.filter((btn) => btn.id !== _id);
  //   setPromptHistory(newArr);
  // }

  async function clearPromptHistory() {
    setClearLoading(true);
    const response = await Api({
      path: "prompt/all",
      method: "DELETE",
      token: localStorage.getItem("token") as string,
    });
    console.log(await response);
    setClearLoading(false);
    setPromptHistory([]);
  }

  return (
    <div
      
    >
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
              <div
                style={{
                  height: "70px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label htmlFor="">PROMPT HISTORY</label>
                {historyMode === "TEXT" ? (
                  <button
                    className="new-prompt-btn"
                    onClick={() => pressModeBtn("newText")}
                  >
                    NEW PROMPT
                  </button>
                ) : (
                  <button
                    className="new-prompt-btn"
                    onClick={() => pressModeBtn("newImage")}
                  >
                    NEW PROMPT
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                height: "80vh",
              }}
            >
              <PromptHistory
                promptHistory={promptHistory}
                setPromptHistory={setPromptHistory}
                promptHistoryLoading={promptHistoryLoading}
              />

              <div>
                <div className="bottom-gradient"></div>
                <div className="clear-history-container">
                  <button
                    onClick={() => clearPromptHistory()}
                    className="clear-btn"
                    style={{ height: "56px" }}
                  >
                    {clearLoading ? (
                      <div className="center">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <>
                        <img
                          style={{ position: "absolute", left: "15px" }}
                          src={TrashBlack}
                        />
                        CLEAR PROMPT-HISTORY
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
