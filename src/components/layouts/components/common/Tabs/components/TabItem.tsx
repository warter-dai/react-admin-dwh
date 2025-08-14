import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import styles from "../index.module.css";
import type { TabItemProps, TabItemType } from "../types";
import useTabsStore from "@/store/tabsStore";
import TabContextMenu from "./TabContextMenu";
import { useNavigate } from "react-router-dom";

function TabItem(
  prop: Partial<Omit<TabItemProps, "key">> & { data?: Partial<TabItemProps> }
) {
  const { activeKey, setActiveKey, tabItems, removeTab } = useTabsStore();
  const navigate = useNavigate();

  const onActiveTab = (prop: Partial<TabItemType>) => {
    setActiveKey(prop.key!);
    const item = tabItems.find((item) => {
      return item.key === prop.key;
    });
    if (!item) return;
    navigate(item.path!);
  };

  const onRemove = (prop: Partial<TabItemType>) => {
    removeTab(prop.key || "");
  };

  return (
    <TabContextMenu
      trigger={"contextMenu"}
      tab={{ ...prop.data, isLasTab: prop.isLasTab }}
    >
      <div
        data-tab-key={prop.data?.key}
        onClick={() => {
          onActiveTab(prop.data!);
        }}
        className={
          styles["tab-item"] +
          " cursor-pointer no-select " +
          (activeKey === prop.data?.key ? styles["tab-item-active"] : "")
        }
      >
        <div>
          {typeof prop.data!.icon === "string" ? (
            <Icon icon={prop.data!.icon} style={{ fontSize: 14 }} />
          ) : (
            prop.data!.icon || null
          )}
        </div>
        <div className={styles["tab-item-label"] + " ellipsis"}>
          {prop.data!.label}
        </div>
        {prop.closable && !prop.isLasTab ? (
          <div
            onClick={() => {
              onRemove(prop.data!);
            }}
            className={styles["tab-item-close"]}
          >
            <CloseOutlined />
          </div>
        ) : (
          ""
        )}
      </div>
    </TabContextMenu>
  );
}

export default TabItem;
