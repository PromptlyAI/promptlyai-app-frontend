import React, { createContext } from "react";

interface SidebarContextType {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  showSidebar: false,
  setShowSidebar: () => {},
});
