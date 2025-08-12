import useMenuStore from "@/store/useMenuStore";
import useTabsStore from "@/store/useTabsStore";
import type { RouteMenuItem } from "@/types/global";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useLayoutMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const { items, setOpenKeys, setActiveKey } = useMenuStore();
  const tabsStore = useTabsStore();
  console.log("处理路由变化，更新菜单状态");

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

  const addTabItem = (path: string) => {
    const menu = findMenuItem(path, items);
    if (!menu) return;
    setActiveKey(path);
    // 查找当前点击项是否已经存在
    const index = tabsStore.tabItems.findIndex((item) => {
      return item.key === path;
    });

    if (index >= 0) {
      tabsStore.setActiveKey(path);
      navigate(tabsStore.tabItems[index].path!);
      return;
    }
    // 点击子菜单添加一个tab
    tabsStore.addTab({
      label: menu?.label,
      key: menu?.key as string,
      icon: menu?.icon,
      closable: true,
      path: menu.key.toString(),
    });
    navigate(menu.key.toString());
  };

  const onItemClick = (event: { key: string }) => {
    addTabItem(event.key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // 处理路由变化，更新菜单状态
  useEffect(() => {
    if (!items?.length) return;

    const currentPath = location.pathname;
    setActiveKey(currentPath);
  }, [location.pathname, items]);

  return {
    onItemClick,
    onOpenChange,
    findMenuItem,
  };
}

export default useLayoutMenu;
