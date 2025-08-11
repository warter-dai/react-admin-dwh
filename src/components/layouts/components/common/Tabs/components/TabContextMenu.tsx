import { Popover } from "antd";
import { useState } from "react";
import type { TabItemType } from "../types";
import styles from "../index.module.css";
import { LineOutlined, ReloadOutlined, TagOutlined } from "@ant-design/icons";
import useTabsStore from "@/store/useTabsStore";
import { useLayoutContext } from "../../Content/LayoutContext";

export type TabContextMenuProps = {
  children: React.ReactNode;
  trigger: "hover" | "focus" | "click" | "contextMenu";
  tab?: Partial<TabItemType>;
  index?: number;
};

function TabContextMenu({
  children,
  trigger = "contextMenu",
  tab,
}: TabContextMenuProps) {
  const [open, setOpen] = useState(false);
  const { tabItems, removeTab } = useTabsStore();
  const { onReload } = useLayoutContext();
  // const { }

  const onCloseAll = () => {
    if (tab?.isLasTab) return;
    let length = tabItems.length;
    tabItems.forEach((item) => {
      // if (item.key === item.key) return;
      if (item.pinned || length === 1) return;
      removeTab(item.path || item.key || "");
      length -= 1;
    });
    setOpen(false);
  };

  const onCloseOther = () => {
    if (tab?.isLasTab) return;
    tabItems.forEach((item) => {
      const key = tab?.key || tab?.path;
      if (item.key === key) return;
      if (item.pinned) return;
      removeTab(item.path || item.key || "");
    });
    setOpen(false);
  };

  const content = (
    <ul className={styles["tab-content-menu"]}>
      <li
        className={` cursor-pointer ` + styles["line"]}
        onClick={() => {
          onReload!(tab);
        }}
      >
        <div className={styles["item"]}>
          <ReloadOutlined />
          <div className="ellipsis">刷新页面</div>
        </div>
      </li>
      <li
        className={` cursor-pointer ` + (tab?.isLasTab ? " disabled " : "")}
        onClick={() => {
          onCloseOther();
        }}
      >
        <div className={styles["item"]}>
          <TagOutlined />
          <div className="ellipsis">关闭其他</div>
        </div>
      </li>
      <li
        className={` cursor-pointer ` + (tab?.isLasTab ? " disabled " : "")}
        onClick={() => {
          onCloseAll();
        }}
      >
        <div className={styles["item"]}>
          <LineOutlined />
          <div className="ellipsis">关闭所有</div>
        </div>
      </li>
    </ul>
  );

  return (
    <Popover
      styles={{
        body: {
          padding: 0,
        },
      }}
      trigger={trigger}
      content={content}
      placement="bottom"
      open={open}
      arrow
      onOpenChange={(v) => setOpen(v)}
    >
      {children}
    </Popover>
  );
}

export default TabContextMenu;
