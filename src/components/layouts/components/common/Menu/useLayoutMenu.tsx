import { useSleep } from "@/hooks/useSleep";
import menuStore from "@/store/menuStore";
import _tabsStore from "@/store/tabsStore";
import type { MenuRef } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useLayoutMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sleep, clearSleep } = useSleep();
  const sleepSpan = 300;

  const { items, setOpenKeys, setActiveKey, activeKey } = menuStore();
  const tabsStore = _tabsStore();

  const menuRef = useRef<MenuRef>(null);

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

  const getOpenKey = (searchKey: string, menus: RouteMenuItem[]) => {
    let openKeys: string[] = [];
    menus.forEach((menu) => {
      if (menu.key === searchKey || menu.path === searchKey) {
        openKeys.push(menu.key.toString() ?? menu.path);
        return;
      }

      if (menu.children) {
        const keys = getOpenKey(searchKey, menu.children);
        if (keys.length > 0) {
          keys.unshift(menu.key.toString() ?? menu.path);
          openKeys = keys;
        }
      }
    });

    return openKeys;
  };

  const scrollToActiveIntoView = async () => {
    const targetTab = menuRef.current?.menu?.list.querySelector(
      `li[path="${activeKey}"]`
    ) as HTMLElement | null;
    if (targetTab) {
      // 取消上次未完成的任务
      clearSleep();
      await sleep(sleepSpan);
      targetTab.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      });
      // await sleep(sleepSpan);
    }
  };

  useEffect(() => {
    sleep(sleepSpan).then(() => {
      scrollToActiveIntoView();
    });
  }, []);

  useEffect(() => {
    scrollToActiveIntoView();
  }, [activeKey]);

  // 处理路由变化，更新菜单状态
  useEffect(() => {
    if (!items?.length) return;

    const currentPath = location.pathname;

    setActiveKey(currentPath);

    // 激活菜单自动打开
    const keys = getOpenKey(location.pathname, items);
    if (keys && keys.length > 0) {
      setOpenKeys(keys);
    }
  }, [location.pathname, items]);

  return {
    onItemClick,
    onOpenChange,
    findMenuItem,
    menuRef,
  };
}

export default useLayoutMenu;
