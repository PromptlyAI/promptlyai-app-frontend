import React, { useState, useEffect, useContext } from "react";
import Api from "../../api/Api";
import runTextAnimation from "../../functions/runTextAnimation";
import StyledInput from "../../shared/input-styles/StyledInput";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./ImagePrompt.css";
import { AppContext } from "../../context/AppContext";

interface ImagePromptProps {
  input: string;
  output: string;
  url: string;
}

interface IProps {
  imagePrompt: ImagePromptProps;
  setImagePrompt: React.Dispatch<React.SetStateAction<ImagePromptProps>>;
  setPromptTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImagePrompt({
  imagePrompt,
  setImagePrompt,
  setPromptTitle,
}: IProps) {
  const { reloadHistory, setReloadHistory, promptId } = useContext(AppContext);

  const [userPrompt, setUserPrompt] = useState<string>("");
  const [promptOutput, setPromptOutput] = useState<string>("");
  const [improvedPrompt, setImprovedPrompt] = useState<string>("");

  const [currentPromptId, setCurrentPromptId] = useState<string>("");

  const [promptOutputLoading, setPromptOutputLoading] =
    useState<boolean>(false);
  const [improvedPromptLoading, setImprovedPromptLoading] =
    useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const textSpeed = 4;

  const [startImage, setStartImage] = useState<boolean>(false);

  useEffect(() => {
    setUserPrompt(imagePrompt.input);
    setPromptOutput(imagePrompt.output);
    setImageUrl(imagePrompt.url);
  }, [imagePrompt]);

  useEffect(() => {
    if (imageUrl !== "") {
      setImageLoading(true);
    }
  }, [imageUrl]);

  async function fetchImprovedImagePrompt() {
    setPromptOutputLoading(true);
    const response = await Api({
      path: `prompt/get-improved-image-prompt?prompt=${userPrompt}&promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });

    console.log(await response);

    const responseString = await response.prompt.output;
    setCurrentPromptId(await response.prompt.id);

    await runTextAnimation(responseString, setPromptOutput, textSpeed);

    setPromptOutputLoading(false);

    setReloadHistory(true);

    await runTextAnimation(userPrompt, setPromptTitle, 55);
  }

  async function fetchImage() {
    setImageLoading(true);
    setImprovedPromptLoading(true);
    const response = await Api({
      path: `prompt/get-improved-image?prompt=${promptOutput}&promptId=${promptId}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    setImprovedPromptLoading(false);
    const data = await response.image_url;
    // setImageUrl(data);

    testing(data);
  }

  const handleDownload = () => {
    window.open(imageUrl);
  };

  function testing(url: string) {
    setTimeout(() => {
      setImageUrl(url);
    }, 1000);
  }

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);
  return (
    <>
      <div style={{ gap: "60px" }} className="prompt-tool-main-container">
        <div>
          <h1 className="big-title">IMAGE TOOL</h1>
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
                    if (!promptOutputLoading && !improvedPromptLoading) {
                      fetchImprovedImagePrompt();
                    }
                  }}
                  btnStyle={improvedPromptLoading ? 2 : 3}
                  unclickable={improvedPromptLoading ? true : false}
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
                    if (!improvedPromptLoading && promptOutput) {
                      fetchImage();
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
              <div
                style={{
                  width: "750px",
                  height: "750px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {imageUrl.length > 0 && (
                  <>
                    {imageLoading && (
                      <div className="image-load-placeholder"></div>
                    )}
                    <img
                      onLoad={() => setImageLoading(false)}
                      style={{
                        width: "500px",
                        height: "500px",
                        display: imageLoading ? "none" : "flex",
                      }}
                      src={imageUrl}
                      alt=""
                    />
                  </>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "20px",
                  paddingTop: "0px",
                }}
              >
                <StyledButton
                  click={() => handleDownload()}
                  btnStyle={3}
                  btnWidth={200}
                  btnHeight={50}
                  title="OPEN"
                />
                <StyledButton
                  click={() => navigator.clipboard.writeText(imageUrl)}
                  btnStyle={3}
                  btnWidth={200}
                  btnHeight={50}
                  title="COPY-URL"
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
