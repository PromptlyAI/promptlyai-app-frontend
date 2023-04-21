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

export default function PromptTool() {
  const { promptId } = useContext(PromptContext);
  const [promptTitle, setPromptTitle] = useState<string>("");

  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
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

  const textSpeed = 4;

  useEffect(() => {
    setNeedToSignIn(false);
    checkIfLogIn();
  });

  useEffect(() => {
    console.log(promptId);
    if (promptId === "new") {
      setUserPrompt("");
      setPromptOutput("");
      setImprovedPrompt("");
      setPromptTitle("new");
    } else if (promptId) {
      console.log("Hheheh");
      loadPromptHistory();
    }
  }, [promptId]);

  async function loadPromptHistory() {
    // if (typeof promptId === "string") {
    //   console.log("is string");
    // }
    setLoadingPrompt(true);
    const response = await Api({
      path: `prompt/get-prompt-info?promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    setUserPrompt(await response.input);
    setPromptOutput(await response.output);
    setImprovedPrompt(await response.answer);
    setPromptTitle(await response.input);
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
  return (
    <div className="prompt-tool-container">
      <Popup displayPopup={needToSignIn} />
      <div className="prompt-tool-top-container">
        <StyledButton
          loading={loadingPrompt}
          btnStyle={3}
          title={
            promptTitle
              ? promptTitle.length > 35
                ? `${promptTitle.slice(0, 35)}...`
                : promptTitle
              : "new"
          }
          bookIcon={true}
          btnWidth={604}
          btnHeight={68}
          pressed={true}
          trashIcon={false}
        />
        {/* {!isPremiumUser && <UpgradeButton />} */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "500px",
        }}
      ></div>
      <div className="prompt-tool-main-container">
        <div>
          <h1 className="big-title">PROMPT TOOL</h1>
          <div className="prompt-tool-main-inner">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h1 style={{ textAlign: "left" }}>Prompt Input</h1>

              <StyledInput
                inpWidht={640}
                inpHeight={255}
                inpStyle={1}
                title={userPrompt}
                change={(ev) => setUserPrompt(ev.target.value)}
                placeHolder="Write your prompt input here..."
              />
              <div>
                <StyledButton
                  click={() => {
                    if (!promptOutputLoading) {
                      fetchImprovedPrompt();
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
            <label htmlFor="">Improved prompt:</label>
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
                inpHeight={255}
                inpWidht={640}
                placeHolder="Your generated prompt will appear here..."
              />
              <div>
                <StyledButton
                  click={() => {
                    if (!improvedPromptLoading) {
                      fetchFinalOutput();
                    }
                  }}
                  btnStyle={3}
                  btnWidth={200}
                  btnHeight={50}
                  title="Generate"
                  loading={improvedPromptLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* {improvedPrompt && ( */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className="big-title">AI GENERATED</h1>
          <div className="right-generate-container">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h1 style={{ textAlign: "left" }}>Output:</h1>
              <StyledInput
                inpWidht={550}
                inpHeight={610}
                inpStyle={1}
                title={improvedPrompt}
                change={(ev) => setImprovedPrompt(ev.target.value)}
                placeHolder="Your generated output will appear here..."
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "20px",
                  paddingTop: "20px",
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
                  loading={improvedPromptLoading}
                />
                <StyledButton
                  click={() => {}}
                  btnStyle={3}
                  btnWidth={200}
                  btnHeight={50}
                  title="COPY"
                  loading={improvedPromptLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
