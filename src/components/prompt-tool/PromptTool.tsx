import React, { useEffect, useState } from "react";
import runTextAnimation from "../../functions/runtextAnimation";
import StyledButton from "../../shared/button-styles/StyledButton";
import "./PromptTool.css";

export default function PromptTool() {
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  // async function runAnimation(finalString: string, ) {
  //   await runTextAnimation("Butcher", setPromptOutput, 50);
  // }

  async function fetchPromptOutput() {
    //fetch prompt output:
    const response = "butcher";

    await runTextAnimation(response, setPromptOutput, 110);
  }

  return (
    <div className="prompt-tool-main-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="center">
          <h1>Prompt Tool</h1>
        </div>
        <label htmlFor="">Choose output</label>
        <div className="output-types-container">
          <StyledButton btnStyle={2} title="text" />
          <StyledButton btnStyle={2} title="picture" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" placeholder="write prompt" />
          <div className="center">
            <div onClick={() => fetchPromptOutput()}>
              <StyledButton btnStyle={1} title="promptify" />
            </div>
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
          <input type="text" value={promptOutput} />
          <StyledButton btnStyle={1} title="Generate" />
          {output && <p>{output}</p>}
        </div>
      </div>
    </div>
  );
}
