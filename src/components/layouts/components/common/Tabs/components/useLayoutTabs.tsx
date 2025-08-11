import { useLocation, useNavigate } from "react-router-dom";
import type { TabItemType } from "../types";
import useTabsStore from "@/store/useTabsStore";
import { useEffect } from "react";
import useMenuStore from "@/store/useMenuStore";
import useLayoutMenu from "../../Menu/useLayoutMenu";

function useLayoutTabs() {
  const { setTabItems, setActiveKey, removeTab, addTab, activeKey, tabItems } =
    useTabsStore();
  const { items } = useMenuStore();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { findMenuItem } = useLayoutMenu();

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

    const item = tabItems.find((item) => {
      return item.key === activeKey;
    });
    if (!item) return;
    navigate(item.path!);
  };

  const initTabs = () => {
    // 查找tab信息，url更新时同步路径信息
    const index = tabItems.findIndex((item) => {
      return item.key === pathname;
    });
    // 创建tab
    if (!tabItems[index]) {
      // 路由跳转过来是需要查找菜单查找菜单
      const item = findMenuItem(pathname, items);
      //
      if (!item) return;
      addTab({
        label: item.label,
        key: item.key.toString(),
        path: pathname,
        icon: item.icon,
        closable: true,
      });
    } else {
      tabItems[index].path = pathname + search;
      tabItems.splice(index, 1, tabItems[index]);
      setTabItems(tabItems);
      setActiveKey(pathname);
    }
  };

  useEffect(() => {
    initTabs();
  }, []);

  // useEffect(() => {}, [pathname + search]);

  return {
    onActiveTab,
    onRemove,
  };
}
export default useLayoutTabs;
