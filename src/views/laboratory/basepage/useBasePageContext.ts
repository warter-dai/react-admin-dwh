import React from "react";

export type BasePageContextProps = {
  /**查询面板展开状态，false: 收缩，true:展开 */
  collapsed?: boolean;
  toggleCollapsed?: () => void;
};
export const BasePageContext = React.createContext<BasePageContextProps>({
  toggleCollapsed: () => {},
});

export const useBasePageContext = () => React.useContext(BasePageContext);
