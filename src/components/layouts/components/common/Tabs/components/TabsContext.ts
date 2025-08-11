import { createContext, useContext, type RefObject } from "react";

export type TabsContextValue = {
  _tabScrollRef?: RefObject<HTMLDivElement | null>;
};
export const TabsContext = createContext<TabsContextValue>({});

export const useTabsContext = () => useContext(TabsContext);
