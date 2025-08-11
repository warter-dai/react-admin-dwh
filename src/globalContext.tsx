import React, { type RefObject } from "react";

export type GlobalContext = {
  theme: "light" | "dark";
  siderWidth: number;
  collapsedSider?: RefObject<boolean>;
};
export const GlobalContext = React.createContext<GlobalContext>({
  theme: "light",
  siderWidth: 300,
});

export const useGlobalContext = () => React.useContext(GlobalContext);
