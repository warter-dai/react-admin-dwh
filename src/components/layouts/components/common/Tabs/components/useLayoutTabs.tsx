import { useLocation } from "react-router-dom";
import useTabsStore from "@/store/tabsStore";
import { useEffect } from "react";
import useMenuStore from "@/store/menuStore";

function useLayoutTabs() {
  const { setTabItems, setActiveKey, addTab, tabItems } = useTabsStore();
  const { items } = useMenuStore();
  const { pathname, search } = useLocation();

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

  const initTabs = () => {
    // 查找tab信息，url更新时同步路径信息
    const index = tabItems.findIndex((item) => {
      return item.key === pathname;
    });
    // 创建tab
    if (!tabItems[index]) {
      // 路由跳转过来是需要查找菜单查找菜单
      const item = findMenuItem(pathname, items);

      if (!item) {
        setActiveKey("");
        return;
      }
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
    if (!items || items.length === 0) return;

    initTabs();
  }, [items]);

  useEffect(() => {
    setActiveKey("");

    // 查找tab信息，url更新时同步路径信息
    const index = tabItems.findIndex((item) => {
      return item.key === pathname;
    });

    if (index < 0) {
      return;
    }
    setActiveKey(pathname);
  }, [pathname + search]);
}
export default useLayoutTabs;
