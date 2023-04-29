import React, { createContext } from "react";

interface AppContextType {
  promptId: string;
  setPromptId: React.Dispatch<React.SetStateAction<string>>;

  reloadHistory: boolean;
  setReloadHistory: React.Dispatch<React.SetStateAction<boolean>>;

  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;

  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;

  historyMode: string;
  setHistoryMode: React.Dispatch<React.SetStateAction<string>>;

  screenDimensions: screenDimensionsProps;
  setScreenDimensions: React.Dispatch<
    React.SetStateAction<screenDimensionsProps>
  >;
}

interface screenDimensionsProps {
  w: number;
  h: number;
}

export const AppContext = createContext<AppContextType>({
  promptId: "",
  setPromptId: () => {},
  reloadHistory: false,
  setReloadHistory: () => {},
  showSettings: false,
  setShowSettings: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  historyMode: "",
  setHistoryMode: () => {},
  screenDimensions: { w: 0, h: 0 },
  setScreenDimensions: () => {},
});
