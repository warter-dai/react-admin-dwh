import useTabsStore from "@/store/tabsStore";
import styles from "../index.module.css";
import type { TabItemProps } from "../types";
import useTabsContent from "./hooks/useTabsContent";
import TableItem from "./TabItem";
import { useEffect, useRef, useState } from "react";
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

  const diraggLine = useRef<HTMLDivElement>(null);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    // tab: Partial<TabItemProps>,
    index: number
  ) => {
    // debugger;
    event.dataTransfer.setData("text", String(index));
    setDragging(true);

    const div = document.createElement("div");
    div.setAttribute("id", "tabs_draggable");
    div.setAttribute(
      "style",
      `position: absolute;
      width:1px;
      background-color:var(--tabs-item-bg-color-primary);
      border:1px solid var(--tabs-item-bg-color-primary);
      
      z-index:999;
      height:${event.currentTarget.offsetHeight - 3}px;
      top:${event.currentTarget.offsetTop}px`
    );

    document.body.appendChild(div);
    diraggLine.current = div;
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!diraggLine.current) return;

    if (
      event.clientX > event.currentTarget.offsetLeft &&
      event.clientX <
        event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2
    ) {
      diraggLine.current.style.left = event.currentTarget.offsetLeft - 1 + "px";
    } else {
      diraggLine.current.style.left =
        event.currentTarget.offsetLeft +
        event.currentTarget.offsetWidth -
        1 +
        "px";
    }
  };

  const onDragEnd = () => {
    setDragging(false);
    if (document.body)
      document.body.removeChild(document.getElementById("tabs_draggable")!);
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
              onDragLeave={(e) => e.preventDefault()}
              key={"tab_" + tab.key}
              draggable-data={index}
              draggable
              onDragOver={(event) => {
                onDragOver(event);
              }}
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
