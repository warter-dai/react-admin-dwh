import TabsContent from "./TabsContent";
import TabButtonLeft from "./TabButtonLeft";
import TabButtonRight from "./TabButtonRight";
import styles from "../index.module.css";
import TabBtns from "./btns";
import useTabsStore from "@/store/useTabsStore";
import useTabsContent from "./hooks/useTabsContent";
import { TabsContext } from "./TabsContext";
// import { useEffect } from "react";

function TabsPanel() {
  const { tabItems } = useTabsStore();
  const { activeKey } = useTabsStore();
  const { tabScrollRef } = useTabsContent({
    sleepSpan: 200,
    activeKey: activeKey,
  });

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
