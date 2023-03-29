import React, { useState } from "react";
import StyledButton from "../../shared/button-styles/StyledButton";
import "./PromptTool.css";

export default function PromptTool() {
  const [generatedText, setGeneratedText] = useState("");
  return (
    <div className="prompt-tool-main-container">
      <div>
        <h1>Prompt Tool</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" placeholder="write prompt" />
          <div className="center">
            <StyledButton btnStyle={1} title="promptify" />
          </div>
        </div>
        <div className="output-types-container">
          <StyledButton btnStyle={1} title="text" />
          <StyledButton btnStyle={1} title="picture" />
        </div>
        <label htmlFor="">output prompt:</label>
        <input type="text" />
        <StyledButton btnStyle={1} title="Generate" />
        {generatedText && <p>{generatedText}</p>}
      </div>
    </div>
  );
}
