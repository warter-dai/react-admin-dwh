import useTabsStore from "@/store/tabsStore";
import styles from "../index.module.css";
import type { TabItemProps } from "../types";
import useTabsContent from "./hooks/useTabsContent";
import TableItem from "./TabItem";
import { useEffect, useState } from "react";
import { useTabsContext } from "./TabsContext";

export type TabsContentProps = {
  tabItems: Partial<TabItemProps>[];
};

function TabsContent({ tabItems }: TabsContentProps) {
  const { activeKey } = useTabsStore();
  const { setTabItems } = useTabsStore();
  const { tabScrollRef } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

  const { _tabScrollRef } = useTabsContext();

  const [dragging, setDragging] = useState(false);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    // tab: Partial<TabItemProps>,
    index: number
  ) => {
    // debugger;
    event.dataTransfer.setData("text", String(index));
    setDragging(true);
  };

  const onDragEnd = () => {
    // debugger;
    setDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const index = Number(event.dataTransfer.getData("text"));
    let targetIndex = getDivParentIndex(event.target as HTMLElement);

    if (index === targetIndex) {
      return;
    }

    if (targetIndex === -1 && event.clientX > 0) {
      targetIndex = event.currentTarget.children.length - 1;
    }

    const targetEl = event.currentTarget.children[
      targetIndex
    ] as HTMLDivElement;

    const items = [...tabItems];
    // 获取当前拖拽对象数据
    const tabItem = items[index];
    let newIndex = targetIndex;

    if (
      event.clientX > targetEl.offsetLeft &&
      event.clientX < targetEl.offsetLeft + targetEl.offsetWidth / 2
    ) {
      newIndex = targetIndex;
    } else {
      newIndex = targetIndex + 1;
    }

    if (index > newIndex) {
      // 移除
      tabItems.splice(index, 1);
      // 插入
      tabItems.splice(newIndex, 0, tabItem);
    } else {
      // 插入
      tabItems.splice(newIndex, 0, tabItem);
      // 移除
      tabItems.splice(index, 1);
    }

    setTabItems(tabItems);

    setDragging(false);
  };

  const getDivParentIndex = (el: HTMLElement) => {
    if (!el) return -1;
    const targetIndex = el.getAttribute("draggable-data") || -1;
    if (Number(targetIndex) >= 0) {
      return Number(targetIndex);
    }

    if (!el.parentElement) {
      return -1;
    }

    return getDivParentIndex(el.parentElement);
  };

  useEffect(() => {
    _tabScrollRef!.current = tabScrollRef.current;
  }, [tabScrollRef]);

  return (
    <div ref={tabScrollRef} className={styles["tabs-scroll"]}>
      <div
        className={styles["tabs-content"] + " w-full"}
        onDrop={(event) => {
          onDrop(event);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {tabItems.map((tab, index) => {
          return (
            <div
              key={"tab_" + tab.key}
              draggable-data={index}
              draggable
              onDragStart={(event) => {
                onDragStart(event, index);
              }}
              onDragEnd={() => {
                onDragEnd();
              }}
              style={{ opacity: dragging ? 0.5 : 1 }}
            >
              <TableItem
                key={tab.key}
                closable={tab.closable}
                path={tab.path}
                icon={tab.icon}
                isLasTab={tabItems.length === 1}
                data={tab}
              ></TableItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TabsContent;
