import TabsContent from "./TabsContent";
import TabButtonLeft from "./TabButtonLeft";
import TabButtonRight from "./TabButtonRight";
import styles from "../index.module.css";
import TabBtns from "./btns";
import useTabsStore from "@/store/tabsStore";
import useTabsContent from "./hooks/useTabsContent";
import { TabsContext } from "./TabsContext";
import useLayoutTabs from "./useLayoutTabs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TabsPanel() {
  const { tabItems } = useTabsStore();
  const { activeKey } = useTabsStore();
  const { tabScrollRef } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

  useLayoutTabs();
  const navigate = useNavigate();

  useEffect(() => {
    const item = tabItems.find((item) => {
      return item.key === activeKey;
    });
    if (!item) return;
    // debugger;
    navigate(item.path!);
  }, [activeKey]);

  return (
    <TabsContext.Provider
      value={{
        _tabScrollRef: tabScrollRef,
      }}
    >
      <div className={styles["tabs-panel"] + " w-full"}>
        <TabButtonLeft></TabButtonLeft>
        <TabsContent tabItems={tabItems}></TabsContent>
        <TabButtonRight></TabButtonRight>
        <TabBtns></TabBtns>
      </div>
    </TabsContext.Provider>
  );
}

export default TabsPanel;
