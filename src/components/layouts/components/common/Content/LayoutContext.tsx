import { createContext, useContext } from "react";
import type { TabItemType } from "../Tabs/types";

export type LayoutContextValue = {
  onReload?: (tab?: Partial<TabItemType>) => void;
};
export const layoutContext = createContext<LayoutContextValue>({});

export const useLayoutContext = () => useContext(layoutContext);
