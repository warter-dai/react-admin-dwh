import { useLocation, useNavigate } from "react-router-dom";
import type { TabItemType } from "../types";
import useTabsStore from "@/store/tabsStore";
import { useEffect } from "react";
import useMenuStore from "@/store/menuStore";

function useLayoutTabs() {
  const { setTabItems, setActiveKey, removeTab, addTab, activeKey, tabItems } =
    useTabsStore();
  const { items } = useMenuStore();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // 查找激活对象
  const findMenuItem = (key: string, items: RouteMenuItem[]) => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children && item.children.length > 0) {
        const it = findMenuItem(key, item.children) as RouteMenuItem | null;
        if (it) {
          return it;
        }
      }
    }
    return null;
  };

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
