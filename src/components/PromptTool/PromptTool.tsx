import React, { useEffect, useState } from "react";
import runTextAnimation from "../../functions/runTextAnimation";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";
import "./PromptTool.css";
import ButtonCollection from "../../shared/ButtonStyles/ButtonCollection";
import UpgradeButton from "../UpgradeSection/UpgradeSection";
import Api from "../../api/Api";

export default function PromptTool() {
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);

  const [userPrompt, setUserPrompt] = useState<string>("");

  const [promptOutput, setPromptOutput] = useState<string>("");
  const [promptId, setPromptId] = useState<string>("");

  const [improvedPrompt, setImprovedPrompt] = useState<string>("");

  const [promptOutputLoading, setPromptOutputLoading] =
    useState<boolean>(false);
  const [improvedPromptLoading, setImprovedPromptLoading] =
    useState<boolean>(false);

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
    setPromptId(await response.prompt.id);

    await runTextAnimation(responseString, setPromptOutput, 14);
  }

  async function fetchFinalOutput() {
    setImprovedPromptLoading(true);
    const response = await Api({
      path: `prompt/get-improved-answer?prompt=${promptOutput}&promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    setImprovedPromptLoading(false);
    const responseString = await response.promptAnswer.output;
    await runTextAnimation(responseString, setImprovedPrompt, 14);
  }
  return (
    <div className="prompt-tool-container">
      <div className="prompt-tool-top-container">
        <StyledButton
          btnStyle={3}
          title="A fish thats swimming underne..."
          bookIcon={true}
          btnWidth={604}
          btnHeight={68}
          pressed={true}
          trashIcon={false}
        />
        {!isPremiumUser && <UpgradeButton />}
      </div>
      <div className="prompt-tool-main-container">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="center">
            <h1>Prompt Tool</h1>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Write a prompt</label>
            <StyledInput
              inpWidht={450}
              inpHeight={200}
              inpStyle={1}
              title={userPrompt}
              change={(ev) => setUserPrompt(ev.target.value)}
            />
            <div className="center">
              <StyledButton
                click={() => {
                  if (!promptOutputLoading) {
                    fetchImprovedPrompt();
                  }
                }}
                btnStyle={3}
                btnWidth={200}
                btnHeight={50}
                title="promptify"
                loading={promptOutputLoading}
              />
            </div>
          </div>
          <label htmlFor="">Improved prompt:</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <StyledInput
              inpStyle={1}
              title={promptOutput}
              change={(ev) => setPromptOutput(ev.target.value)}
              inpHeight={200}
              inpWidht={450}
            />

            <StyledButton
              click={() => {
                if (!improvedPromptLoading) {
                  fetchFinalOutput();
                }
              }}
              btnStyle={3}
              btnWidth={200}
              btnHeight={50}
              title="Generate Text"
              loading={improvedPromptLoading}
            />
          </div>
        </div>
        {/* {improvedPrompt && ( */}
        <div style={{ height: "85%", display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Generated Text:</label>
            <StyledInput
              inpWidht={450}
              inpHeight={600}
              inpStyle={1}
              title={improvedPrompt}
              change={(ev) => setImprovedPrompt(ev.target.value)}
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
