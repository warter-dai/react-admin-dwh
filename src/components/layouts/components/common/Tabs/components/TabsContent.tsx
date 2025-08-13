import useTabsStore from "@/store/tabsStore";
import styles from "../index.module.css";
import type { TabItemProps } from "../types";
import useTabsContent from "./hooks/useTabsContent";
import TableItem from "./TabItem";
import { useEffect } from "react";
import { useTabsContext } from "./TabsContext";

export type TabsContentProps = {
  tabItems: Partial<TabItemProps>[];
};

function TabsContent({ tabItems }: TabsContentProps) {
  const { activeKey } = useTabsStore();
  const { tabScrollRef } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

  const { _tabScrollRef } = useTabsContext();

  useEffect(() => {
    _tabScrollRef!.current = tabScrollRef.current;
  }, [tabScrollRef]);

  return (
    <div ref={tabScrollRef} className={styles["tabs-scroll"]}>
      <div className={styles["tabs-content"] + " w-full"}>
        {tabItems.map((tab) => {
          return (
            <TableItem
              key={tab.key}
              closable={tab.closable}
              path={tab.path}
              icon={tab.icon}
              isLasTab={tabItems.length === 1}
              data={tab}
            ></TableItem>
          );
        })}
      </div>
    </div>
  );
}

export default TabsContent;
