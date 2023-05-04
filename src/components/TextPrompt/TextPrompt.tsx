import React, { useState, useEffect, useContext } from "react";
import Api from "../../api/Api";
import runTextAnimation from "../../functions/runTextAnimation";
import StyledInput from "../../shared/input-styles/StyledInput";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { AppContext } from "../../context/AppContext";
interface TextPromptProps {
  answer: string;
  input: string;
  output: string;
}

interface IProps {
  textPrompt: TextPromptProps;
  setTextPrompt: React.Dispatch<React.SetStateAction<TextPromptProps>>;
  setPromptTitle: React.Dispatch<React.SetStateAction<string>>;

  //   setLoadingPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  //   promptType: string;
}

export default function TextPrompt({
  textPrompt,
  setTextPrompt,
  setPromptTitle,
}: IProps) {
  const { reloadHistory, setReloadHistory, screenDimensions, promptId } =
    useContext(AppContext);

  const [userPrompt, setUserPrompt] = useState<string>("");
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [improvedPrompt, setImprovedPrompt] = useState<string>("");

  const [currentPromptId, setCurrentPromptId] = useState<string>("");

  const [promptOutputLoading, setPromptOutputLoading] =
    useState<boolean>(false);
  const [improvedPromptLoading, setImprovedPromptLoading] =
    useState<boolean>(false);

  const textSpeed = 6;

  const [inputWidth, setInputWidht] = useState<string>("700px");
  const [inputHeight, setInputHeight] = useState<string>("350px");

  // useEffect(() => {
  //   if (screenDimensions.w < 770) {
  //     setInputHeight(200);
  //     setInputWidht(300);
  //     return;
  //   }
  //   if (screenDimensions.w < 1680) {
  //     setInputWidht(400);
  //     setInputHeight(250);
  //     return;
  //   }

  //   if (screenDimensions.w < 1900) {
  //     setInputWidht(400);
  //     setInputHeight(350);
  //     return;
  //   }

  //   if (screenDimensions.w < 2100) {
  //     setInputWidht(500);
  //     setInputHeight(350);
  //     return;
  //   }

  //   if (screenDimensions.w < 2298) {
  //     setInputWidht(600);
  //     setInputHeight(350);
  //     return;
  //   }

  //   setInputWidht(700);
  //   setInputHeight(350);
  // }, [screenDimensions.w]);

  useEffect(() => {
    setUserPrompt(textPrompt.input);
    setPromptOutput(textPrompt.output);
    setImprovedPrompt(textPrompt.answer);
  }, [textPrompt]);

  //   const [textAnswer, setTextAnswer] = useState<string>(textPrompt.answer);
  //   const [inputAnswer, setInputAnswer] = useState<string>(textPrompt.input);
  //   const [outputAnswer, setOutputAnswer] = useState<string>(textPrompt.output);

  //   useEffect(() => {
  //     if (promptId) {
  //       loadPromptHistory();
  //     }
  //   }, [promptId]);

  async function fetchImprovedPrompt() {
    // if (promptType !== "Text") {
    //   return;
    // }
    //fetch prompt output:
    setPromptOutputLoading(true);
    const response = await Api({
      path: `prompt/get-improved-prompt?prompt=${userPrompt}&promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    console.log(await response);
    setPromptOutputLoading(false);

    const responseString = await response.prompt.output;
    setCurrentPromptId(await response.prompt.id);

    await runTextAnimation(responseString, setPromptOutput, textSpeed);

    setReloadHistory(true);
  }

  async function fetchFinalOutput() {
    // if (promptType !== "Text") {
    //   return;
    // }
    setImprovedPromptLoading(true);
    const response = await Api({
      path: `prompt/get-improved-answer?prompt=${promptOutput}&promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    console.log(await response);

    setImprovedPromptLoading(false);
    const responseString = await response.promptAnswer.output;
    await runTextAnimation(responseString, setImprovedPrompt, textSpeed);

    await runTextAnimation(userPrompt, setPromptTitle, 55);
  }
  return (
    <>
      {/* {promptType !== "IMAGE" && ( */}
      <div
        style={{
          gap: "60px",
        }}
        className="prompt-tool-main-container"
      >
        <div style={{ width: "100%" }}>
          <h1 className="big-title">TEXT PROMPT TOOL</h1>
          <div className="prompt-tool-main-inner">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                height: "100%",
              }}
            >
              <h1 style={{ textAlign: "left" }}>Prompt Input</h1>
              <StyledInput
                inpHeight={"90%"}
                inpWidht="97%"
                inpStyle={1}
                title={userPrompt}
                change={(ev) => setUserPrompt(ev.target.value)}
                placeHolder="Write your prompt input here..."
              />

              <div>
                <StyledButton
                  click={() => {
                    if (!promptOutputLoading && userPrompt) {
                      fetchImprovedPrompt();
                    }
                  }}
                  btnStyle={userPrompt ? 3 : 2}
                  unclickable={userPrompt ? false : true}
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
                width: "100%",
                gap: "10px",
                height: "100%",
              }}
            >
              <StyledInput
                inpStyle={1}
                title={promptOutput}
                change={(ev) => setPromptOutput(ev.target.value)}
                inpHeight={"90%"}
                inpWidht="97%"
                placeHolder="Your generated prompt will appear here..."
              />
              <div>
                <StyledButton
                  click={() => {
                    if (!improvedPromptLoading && promptOutput) {
                      fetchFinalOutput();
                    }
                  }}
                  btnStyle={promptOutput ? 3 : 2}
                  unclickable={promptOutput ? false : true}
                  btnWidth={200}
                  btnHeight={50}
                  title="Generate"
                  loading={improvedPromptLoading}
                />
                {improvedPromptLoading && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        color: "white",
                        fontSize: "15px",
                        margin: "",
                      }}
                    >
                      this may take some time...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h1 className="big-title">AI GENERATED</h1>
          <div className="right-generate-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                height: "100%",
                width: "100%",
              }}
            >
              <h1 style={{ textAlign: "left" }}>Output:</h1>
              <StyledInput
                inpHeight={"100%"}
                inpStyle={1}
                inpWidht="97%"
                title={improvedPrompt}
                change={(ev) => setImprovedPrompt(ev.target.value)}
                placeHolder="Your generated output will appear here..."
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: screenDimensions.w > 750 ? "row" : "column",
                  gap: "20px",
                  paddingTop: "0px",
                }}
              >
                <StyledButton
                  click={() => {}}
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
      </div>
      {/* )} */}
    </>
  );
}
