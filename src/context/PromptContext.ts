import React, { createContext } from "react";

interface PromptContextType {
  promptId: string;
  setPromptId: React.Dispatch<React.SetStateAction<string>>;
}

export const PromptContext = createContext<PromptContextType>({
  promptId: "",
  setPromptId: () => {},
});
