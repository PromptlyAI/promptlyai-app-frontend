import React, { useContext } from "react";
import PromptTool from "../../components/PromptTool/PromptTool";
import { AppContext } from "../../context/AppContext";

export default function PromptPage() {
  const { screenDimensions } = useContext(AppContext);
  return (
    <div
      style={{
        flex: "1",
        // position: screenDimensions.w < 1219 && "absolute",
        // marginLeft: screenDimensions.w < 1219 && "200px",
      }}
    >
      <PromptTool />
    </div>
  );
}
