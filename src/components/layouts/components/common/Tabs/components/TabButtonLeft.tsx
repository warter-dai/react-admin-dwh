import { DoubleLeftOutlined } from "@ant-design/icons";
import styles from "../index.module.css";
import useTabsStore from "@/store/useTabsStore";
import useTabsContent from "./hooks/useTabsContent";
import { useEffect } from "react";
import { useTabsContext } from "./TabsContext";

function TabButtonLeft() {
  const { activeKey } = useTabsStore();
  const { tabScrollRef, scrollRight } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

  const { _tabScrollRef } = useTabsContext();

  useEffect(() => {
    tabScrollRef!.current = _tabScrollRef!.current;
  }, [_tabScrollRef]);

  const onScrollLeft = () => {
    scrollRight();
  };

  return (
    <div
      onClick={() => {
        onScrollLeft();
      }}
      className={styles["tab-button-left"] + " cursor-pointer "}
    >
      <DoubleLeftOutlined style={{ fontSize: 16 }} />
    </div>
  );
}

export default TabButtonLeft;
