import React, { createContext } from "react";

interface SettingsContextType {
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsContext = createContext<SettingsContextType>({
  showSettings: false,
  setShowSettings: () => {},
});
