import React, { useEffect, useState, useContext } from "react";
import runTextAnimation from "../../functions/runTextAnimation";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";
import "./PromptTool.css";
import ButtonCollection from "../../shared/ButtonStyles/ButtonCollection";
import UpgradeButton from "../UpgradeSection/UpgradeSection";
import Api from "../../api/Api";
import { useNavigate } from "react-router";
import Popup from "../Popup/popup";
import { PromptContext } from "../../context/PromptContext";

import BookWhite from "../../images/BookWhite.png";
import TrashWhite from "../../images/TrashWhite.png";
import Edit from "../../images/Edit.png";
import PromptlyLogo from "../../images/PromptlyLogo.png";
import LoginCheck from "../../shared/LoginCheck/LoginCheck";
import TextPrompt from "../TextPrompt/TextPrompt";
import ImagePrompt from "../ImagePrompt/ImagePrompt";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import { SettingsContext } from "../../context/SettingsContext";

interface TextPromptProps {
  answer: string;
  input: string;
  output: string;
}
interface ImagePromptProps {
  input: string;
  output: string;
  url: string;
}

export default function PromptTool() {
  const { promptId } = useContext(PromptContext);
  const { showSettings, setShowSettings } = useContext(SettingsContext);

  const [promptTitle, setPromptTitle] = useState<string>("");

  const [loadingPrompt, setLoadingPrompt] = useState<boolean>(false);

  // const [userPrompt, setUserPrompt] = useState<string>("");
  // const [promptOutput, setPromptOutput] = useState<string>("");
  // const [currentPromptId, setCurrentPromptId] = useState<string>("");

  const [imageUrl, setImageUrl] = useState<string>("");
  const textSpeed = 4;
  const [needToSignIn, setNeedToSignIn] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<string>("TEXT");

  const [showTextPrompt, setShowTextPrompt] = useState<boolean>(true);

  const [textPrompt, setTextPrompt] = useState<TextPromptProps>({
    answer: "",
    input: "",
    output: "",
  });
  const [imagePrompt, setImagePrompt] = useState<ImagePromptProps>({
    input: "",
    output: "",
    url: "",
  });

  useEffect(() => {
    if (LoginCheck()) {
      setNeedToSignIn(true);
      console.log("need to sign in");
    } else {
      setNeedToSignIn(false);
      console.log("signed in");
    }
  });

  useEffect(() => {
    if (promptId === "newText") {
      setShowTextPrompt(true);
      setTextPrompt({
        answer: "",
        input: "",
        output: "",
      });
    } else if (promptId === "newImage") {
      setShowTextPrompt(false);
      setImagePrompt({
        input: "",
        output: "",
        url: "",
      });
    } else if (promptId.length > 0) {
      loadPromptTextHistory();
    }
    setPromptTitle("new");
  }, [promptId]);

  async function loadPromptTextHistory() {
    setLoadingPrompt(true);
    const response = await Api({
      path: `prompt/get-prompt-info?promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    console.log(await response);

    const type = await response.type;
    if (type === "TEXT") {
      setTextPrompt({
        answer: await response.answer,
        input: await response.input,
        output: await response.output,
      });
      setShowTextPrompt(true);
    } else if (type === "IMAGE") {
      setImagePrompt({
        input: await response.input,
        output: await response.output,
        url: await response.answer,
      });
      setShowTextPrompt(false);
    }

    setPromptTitle(await response.input);

    setLoadingPrompt(false);
    // setImprovedPrompt(await response.answer);
    // setUserPrompt(await response.input);
    //check if prompt is a image or prompt:
    // if ((await response.type) === "Image") {
    //   setPromptOutput("");
    //   setImageUrl(await response.type);
    // } else {
    //   setImageUrl("");
    //   setPromptOutput(await response.output);
    // }
  }
  // async function loadPromptImageHistory() {
  //   setLoadingPrompt(true);
  //   const response = await Api({
  //     path: `prompt/get-prompt-info?promptId=${promptId}`,
  //     method: "GET",
  //     token: localStorage.getItem("token") as string,
  //   });
  //   setImagePrompt({
  //     answer: await response.answer,
  //     input: await response.input,
  //     url: await response.output,
  //   });
  //   setPromptTitle(await response.answer);
  //   setLoadingPrompt(false);
  // }
  // async function checkType() {
  //   console.log(promptId);
  //   const response = await Api({
  //     path: `prompt/get-prompt-info?promptId=${promptId}`,
  //     method: "GET",
  //     token: localStorage.getItem("token") as string,
  //   });
  //   setPromptType(await response.type);
  // }

  return (
    <div>
      <div className="prompt-tool-top-container">
        <div className="hide-bar"></div>
        <div className="prompt-title-container">
          <img
            style={{ width: "47.2px", height: "38.4px" }}
            src={BookWhite}
            alt=""
          />
          <div style={{ width: "500px" }}>
            {loadingPrompt ? (
              <div className="center">
                <div className="loader"></div>
              </div>
            ) : (
              <h1>
                {promptTitle
                  ? promptTitle.length > 31
                    ? `${promptTitle.slice(0, 31)}...`
                    : promptTitle
                  : "new"}
              </h1>
            )}
          </div>
          <div
            style={{
              width: "110px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img style={{ width: "38px", height: "38px" }} src={Edit} alt="" />
            <img
              style={{ width: "51px", height: "48px" }}
              src={TrashWhite}
              alt=""
            />
          </div>
        </div>
        <div
          style={{ display: "flex", width: "400px", justifyContent: "center" }}
        >
          <img src={PromptlyLogo} alt="" />
        </div>
      </div>
      <div className="prompt-tool-container">
        {showSettings && <SettingsPage />}
        {needToSignIn && <Popup displayPopup={needToSignIn} />}
        {showTextPrompt ? (
          <TextPrompt
            textPrompt={textPrompt}
            setTextPrompt={setTextPrompt}
            setPromptTitle={setPromptTitle}
          />
        ) : (
          <ImagePrompt
            imagePrompt={imagePrompt}
            setImagePrompt={setImagePrompt}
            setPromptTitle={setPromptTitle}
          />
        )}
      </div>
    </div>
  );
}
