import { DoubleRightOutlined } from "@ant-design/icons";
import styles from "../index.module.css";
import useTabsContent from "./hooks/useTabsContent";
import { useEffect } from "react";
import { useTabsContext } from "./TabsContext";
import useTabsStore from "@/store/tabsStore";

function TabButtonRight() {
  const { activeKey } = useTabsStore();
  const { _tabScrollRef } = useTabsContext();
  const { tabScrollRef, scrollLeft } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

  useEffect(() => {
    tabScrollRef!.current = _tabScrollRef!.current;
  }, [_tabScrollRef?.current]);

  const onScrollRight = () => {
    scrollLeft();
  };

  return (
    <div
      onClick={() => {
        onScrollRight();
      }}
      className={styles["tab-button-right"] + " cursor-pointer "}
    >
      <DoubleRightOutlined style={{ fontSize: 16 }} />
    </div>
  );
}

export default TabButtonRight;
