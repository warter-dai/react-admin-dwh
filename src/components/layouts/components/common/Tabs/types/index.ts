import type { ReactNode, RefObject } from "react";

export type TabItemType = {
  /**唯一键 */
  key: string;
  //   /**显示关闭按钮 */
  closable?: boolean;
  /** 是否可用 */
  disabled?: boolean;
  icon: React.ReactNode | string;
  /** 显示内容 */
  label: ReactNode;
  // /** 固定标签 */
  pinned?: boolean;
  path?: string;
  isLasTab?: boolean;
};

export type TabItemProps = TabItemType & {
  tabScrollRef?: RefObject<HTMLDivElement | null>;
  onActiveTab?: (prop: TabItemProps) => void;
};
