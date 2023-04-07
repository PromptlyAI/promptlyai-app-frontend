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
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  async function fetchPromptOutput() {
    //fetch prompt output:

    const response = await Api({
      path: `/prompt?${promptOutput}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    await runTextAnimation(response, setPromptOutput, 20);
  }

  async function fetchOutput() {
    //fetch output:
    const response = await Api({
      path: `/prompt?prompt=${promptOutput}`,
      method: "GET",
    });

    await runTextAnimation(response, setOutput, 20);
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
          <label htmlFor="">Choose output</label>
          <div className="output-types-container">
            <ButtonCollection buttonsTitles={["text", "picture"]} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="text" placeholder="write prompt" />
            <div className="center">
              <StyledButton
                click={() => fetchPromptOutput()}
                btnStyle={1}
                title="promptify"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="">output prompt:</label>
            <StyledInput
              inpStyle={1}
              title={promptOutput}
              change={(ev) => setPromptOutput(ev.target.value)}
              inpHeight={100}
              inpWidht={400}
            />

            <StyledButton
              click={() => fetchOutput()}
              btnStyle={1}
              title="Generate"
            />

            {output && (
              <div className="output-text-container">
                <span>{output}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
