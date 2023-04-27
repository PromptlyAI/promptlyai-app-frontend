import React, { createContext } from "react";

interface ReloadHistoryContextType {
  reloadHistory: boolean;
  setReloadHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReloadHistoryContext = createContext<ReloadHistoryContextType>({
  reloadHistory: false,
  setReloadHistory: () => {},
});
