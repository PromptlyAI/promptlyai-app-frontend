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

export default function PromptTool() {
  const { promptId } = useContext(PromptContext);
  const [promptTitle, setPromptTitle] = useState<string>("");

  const [loadingPrompt, setLoadingPrompt] = useState<boolean>(false);

  const [userPrompt, setUserPrompt] = useState<string>("");
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [currentPromptId, setCurrentPromptId] = useState<string>("");

  const [improvedPrompt, setImprovedPrompt] = useState<string>("");

  const [promptOutputLoading, setPromptOutputLoading] =
    useState<boolean>(false);
  const [improvedPromptLoading, setImprovedPromptLoading] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [needToSignIn, setNeedToSignIn] = useState<boolean>(false);

  // const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const textSpeed = 4;

  // const [copyColor, setCopyColor] = useState<string>("");

  useEffect(() => {
    setNeedToSignIn(false);
    checkIfLogIn();
  });

  useEffect(() => {
    console.log(promptId);
    if (promptId === "new" || promptId === "image") {
      setUserPrompt("");
      setPromptOutput("");
      setImprovedPrompt("");
      setPromptTitle("new");
      setImageUrl("");
    } else if (promptId) {
      loadPromptHistory();
    }
  }, [promptId]);

  async function loadPromptHistory() {
    setLoadingPrompt(true);
    const response = await Api({
      path: `prompt/get-prompt-info?promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    console.log(await response);

    setImprovedPrompt(await response.answer);
    setUserPrompt(await response.input);
    setPromptTitle(await response.input);
    //check if prompt is a image or prompt:
    if ((await response.type) === "Image") {
      setPromptOutput("");
      setImageUrl(await response.type);
    } else {
      setImageUrl("");
      setPromptOutput(await response.output);
    }

    setLoadingPrompt(false);
  }

  function checkIfLogIn() {
    let token = localStorage.getItem("token");
    if (!token) {
      setNeedToSignIn(true);
    } else if (isJwtExpired(token)) {
      navigate("/login");
    }
  }

  function isJwtExpired(jwt: string) {
    // Step 1: Split the token into its parts
    const tokenParts = jwt.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    // Step 2: Decode the payload
    const payloadBase64Url = tokenParts[1];
    const payloadBase64 = payloadBase64Url.replace("-", "+").replace("_", "/");
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // Step 3: Check the 'exp' claim
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (payload.exp && payload.exp < currentTime) {
      return true; // Token has expired
    }

    return false; // Token has not expired
  }

  async function fetchImprovedPrompt() {
    //fetch prompt output:
    setPromptOutputLoading(true);
    const response = await Api({
      path: `prompt/get-improved-prompt?prompt=${userPrompt}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    // console.log(await response);
    setPromptOutputLoading(false);
    const responseString = await response.prompt.output;
    setCurrentPromptId(await response.prompt.id);

    await runTextAnimation(responseString, setPromptOutput, textSpeed);
  }

  async function fetchFinalOutput() {
    setImprovedPromptLoading(true);
    const response = await Api({
      path: `prompt/get-improved-answer?prompt=${promptOutput}&promptId=${currentPromptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    setImprovedPromptLoading(false);
    const responseString = await response.promptAnswer.output;
    await runTextAnimation(responseString, setImprovedPrompt, textSpeed);

    await runTextAnimation(userPrompt, setPromptTitle, 55);
  }

  async function fetchImprovedImagePrompt() {
    setPromptOutputLoading(true);
    const response = await Api({
      path: `prompt/get-improved-image-prompt?prompt=${promptOutput}&promptId=${currentPromptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    setPromptOutputLoading(true);

    console.log(await response);

    const responseString = await response.prompt.output;
    setCurrentPromptId(await response.prompt.id);

    await runTextAnimation(responseString, setPromptOutput, textSpeed);
    // set(await response.image_url);
  }

  async function fetchImage() {
    setImprovedPromptLoading(true);
    const response = await Api({
      path: `prompt/get-improved-image?prompt=${promptOutput}&promptId=${currentPromptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    setImprovedPromptLoading(false);
    console.log(await response);
    setImageUrl(await response.image_url);
  }

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
        <Popup displayPopup={needToSignIn} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
          }}
        ></div>
        <div style={{ gap: "60px" }} className="prompt-tool-main-container">
          <div>
            {promptId === "image" ? (
              <h1 className="big-title">IMAGE TOOL</h1>
            ) : (
              <h1 className="big-title">PROMPT TOOL</h1>
            )}

            <div className="prompt-tool-main-inner">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <h1 style={{ textAlign: "left" }}>Prompt Input</h1>

                <StyledInput
                  inpWidht={700}
                  inpHeight={350}
                  inpStyle={1}
                  title={userPrompt}
                  change={(ev) => setUserPrompt(ev.target.value)}
                  placeHolder="Write your prompt input here..."
                />

                <div>
                  <StyledButton
                    click={() => {
                      if (!promptOutputLoading) {
                        if (promptId === "image") {
                          fetchImprovedImagePrompt();
                        } else {
                          fetchImprovedPrompt();
                        }
                      }
                    }}
                    btnStyle={3}
                    btnWidth={200}
                    btnHeight={50}
                    title="Improve"
                    loading={promptOutputLoading}
                  />
                </div>
              </div>
              <h1 style={{ textAlign: "left" }}>Improved prompt:</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <StyledInput
                  inpStyle={1}
                  title={promptOutput}
                  change={(ev) => setPromptOutput(ev.target.value)}
                  inpHeight={350}
                  inpWidht={700}
                  placeHolder="Your generated prompt will appear here..."
                />
                <div>
                  <StyledButton
                    click={() => {
                      if (!improvedPromptLoading) {
                        if (promptId === "image") {
                          fetchImage();
                        } else {
                          fetchFinalOutput();
                        }
                      }
                    }}
                    btnStyle={3}
                    btnWidth={200}
                    btnHeight={50}
                    title="Generate"
                    loading={improvedPromptLoading}
                  />
                  {improvedPromptLoading && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ color: "white", fontSize: "15px" }}>
                        this may take some time...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* {improvedPrompt && ( */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="big-title">AI GENERATED</h1>
            <div className="right-generate-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <h1 style={{ textAlign: "left" }}>Output:</h1>
                {promptId === "image" ? (
                  <div className="image-container">
                    {imageUrl && (
                      <img className="generated-image" src={imageUrl} alt="" />
                    )}
                  </div>
                ) : (
                  <StyledInput
                    inpWidht={750}
                    inpHeight={850}
                    inpStyle={1}
                    title={improvedPrompt}
                    change={(ev) => setImprovedPrompt(ev.target.value)}
                    placeHolder="Your generated output will appear here..."
                  />
                )}

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "20px",
                    paddingTop: "0px",
                  }}
                >
                  <StyledButton
                    click={() => {
                      if (!improvedPromptLoading) {
                        fetchFinalOutput();
                      }
                    }}
                    btnStyle={3}
                    btnWidth={200}
                    btnHeight={50}
                    title="SAVE"
                  />
                  <StyledButton
                    click={() => navigator.clipboard.writeText(improvedPrompt)}
                    btnStyle={3}
                    btnWidth={200}
                    btnHeight={50}
                    title="COPY"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
