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
  const { promptId } = useContext(AppContext);
  const { reloadHistory, setReloadHistory } = useContext(AppContext);

  const [userPrompt, setUserPrompt] = useState<string>("");
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [improvedPrompt, setImprovedPrompt] = useState<string>("");

  const [currentPromptId, setCurrentPromptId] = useState<string>("");

  const [promptOutputLoading, setPromptOutputLoading] =
    useState<boolean>(false);
  const [improvedPromptLoading, setImprovedPromptLoading] =
    useState<boolean>(false);

  const textSpeed = 6;

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
      <div style={{ gap: "60px" }} className="prompt-tool-main-container">
        <div>
          <h1 className="big-title">PROMPT TOOL</h1>
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
                      fetchFinalOutput();
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
              <StyledInput
                inpWidht={750}
                inpHeight={850}
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
