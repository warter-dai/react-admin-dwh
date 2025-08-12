import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
// import { v4 as uuidV4 } from "uuid";
import Animator, { type AnimationType } from "@/components/Animator";
import Tabs from "../Tabs";
import styles from "./index.module.css";
import { layoutContext } from "./LayoutContext";
import useGoto from "@/hooks/useGoto";

import useTabsStore from "@/store/useTabsStore";
import type { TabItemType } from "../Tabs/types";
import AppFooter from "@/components/layouts/components/common/Footer/index";

const { Content } = Layout;

const AppContent = () => {
  const { pathname, search } = useLocation();
  const cacheKey = useMemo(() => pathname + search, [pathname, search]);
  const { go } = useGoto();
  const { tabItems } = useTabsStore();
  const { setActiveKey } = useTabsStore();
  const onReload = (event: Partial<TabItemType>) => {
    if (event) {
      const item = tabItems.find((item) => {
        return item.key === event.key;
      });
      setActiveKey(item!.key!);
      go("/redirect" + item?.path);
    } else {
      go("/redirect" + pathname + search);
    }
  };

  // 入场动画
  const animationType: AnimationType = "fadeLeft";
  return (
    <layoutContext.Provider
      value={{
        onReload: (tab) => {
          onReload(tab!);
        },
      }}
    >
      <div className={styles["page-panel"]}>
        <Content className={styles["page-content"]}>
          <Tabs />
          <div
            className={styles["content"] + " flex-1 "}
            style={{ overflowX: "hidden" }}
          >
            <Animator
              style={{
                display: "flex",

                flexDirection: "column",
                flex: "1",
              }}
              key={cacheKey}
              config={{
                type: animationType,
                duration: 0.4,
              }}
            >
              <Outlet />
            </Animator>
          </div>
          <AppFooter></AppFooter>
        </Content>
      </div>
    </layoutContext.Provider>
  );
};

export default AppContent;
