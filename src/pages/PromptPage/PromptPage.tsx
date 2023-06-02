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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80%",
              width: "500px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Doc-editor</h1>
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
            <h1>Terminal</h1>

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
                placeHolder="Write your< prompt input here..."
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80%",
              width: "500px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Settings</h1>
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
            <h1>Actions</h1>

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
                placeHolder="Write your< prompt input here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
