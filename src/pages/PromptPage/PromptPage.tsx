import React, { useContext, useState } from "react";
import PromptTool from "../../components/PromptTool/PromptTool";
import { AppContext } from "../../context/AppContext";
import "./PromptPage.css";
import StyledInput from "../../shared/input-styles/StyledInput";

export default function PromptPage() {
  const { screenDimensions } = useContext(AppContext);
  const [userInput, setUserInput] = useState<string>("");
  return (
    <div
      style={{
        flex: "1",
        // position: screenDimensions.w < 1219 && "absolute",
        // marginLeft: screenDimensions.w < 1219 && "200px",
      }}
    >
      {/* <PromptTool /> */}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "500px",
              alignItems: "center",
              background: "orange",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StyledInput
                inpHeight={"90%"}
                inpWidht="97%"
                textSize={screenDimensions.w > 1800 ? "22px" : "15px"}
                inpStyle={1}
                title={userInput}
                change={(ev) => setUserInput(ev.target.value)}
                placeHolder="Write your prompt input here..."
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StyledInput
                inpHeight={"90%"}
                inpWidht="97%"
                textSize={screenDimensions.w > 1800 ? "22px" : "15px"}
                inpStyle={1}
                title={userInput}
                change={(ev) => setUserInput(ev.target.value)}
                placeHolder="Write your prompt input here..."
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "500px",
            alignItems: "center",
            background: "orange",
          }}
        >
          <div>Settings</div>
          <div>Actions</div>
        </div>
      </div>
    </div>
  );
}
