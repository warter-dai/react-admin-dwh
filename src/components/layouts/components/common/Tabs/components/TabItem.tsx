import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import styles from "../index.module.css";
import type { TabItemProps } from "../types";
import useTabsStore from "@/store/tabsStore";
import useLayoutTabs from "./useLayoutTabs";
import TabContextMenu from "./TabContextMenu";

function TabItem(
  prop: Partial<Omit<TabItemProps, "key">> & { data?: Partial<TabItemProps> }
) {
  const { activeKey } = useTabsStore();
  const { onActiveTab, onRemove } = useLayoutTabs();

  return (
    <TabContextMenu
      trigger={"contextMenu"}
      tab={{ ...prop.data, isLasTab: prop.isLasTab }}
    >
      <div
        data-tab-key={prop.data?.key}
        className={
          styles["tab-item"] +
          " cursor-pointer " +
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
        <div
          onClick={() => {
            onActiveTab(prop.data!);
          }}
          className={styles["tab-item-label"] + " ellipsis"}
        >
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
