import React, { useEffect, useState } from "react";
import runTextAnimation from "../../functions/runTextAnimation";
import StyledButton from "../../shared/button-styles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";
import "./PromptTool.css";
import ButtonCollection from "../../shared/button-styles/ButtonCollection";

export default function PromptTool() {
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  async function fetchPromptOutput() {
    //fetch prompt output:
    const response = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
      molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
      numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
      optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
      obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
      nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
      tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,`;

    await runTextAnimation(response, setPromptOutput, 20);
  }

  async function fetchOutput() {
    //fetch output:
    const response = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
      molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
      numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
      optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
      obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
      nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
      tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
      quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
      sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
      recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
      minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
      quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
      fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
      consequuntur! Commodi minima excepturi repudiandae velit hic maxime
      doloremque. Quaerat provident commodi consectetur veniam similique ad
      earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
      fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
      suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
      modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
      totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
      quasi aliquam eligendi, placeat qui corporis!`;

    await runTextAnimation(response, setOutput, 20);
  }
  return (
    <div className="prompt-tool-main-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="center">
          <h1>Prompt Tool</h1>
        </div>
        <label htmlFor="">Choose output</label>
        <div className="output-types-container">
          <ButtonCollection buttonsTitles={["text", "picture"]} />
          {/* <StyledButton btnStyle={2} title="text" />
          <StyledButton btnStyle={2} title="picture" /> */}
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
  );
}
