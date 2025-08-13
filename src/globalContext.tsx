import React, { type RefObject } from "react";
import { type useAppProps } from "antd/es/app/context";

export type GlobalContext = {
  theme: "light" | "dark";
  siderWidth: number;
  collapsedSider?: RefObject<boolean>;
  useAppProps?: useAppProps;
};
export const GlobalContext = React.createContext<GlobalContext>({
  theme: "light",
  siderWidth: 300,
});

export const useGlobalContext = () => React.useContext(GlobalContext);
