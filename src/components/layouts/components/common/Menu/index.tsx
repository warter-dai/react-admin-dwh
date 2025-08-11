import useMenuStore from "@/store/useMenuStore";
import type { MenuItem } from "@/types/global";
import { Menu, type MenuTheme } from "antd";
import useLayoutMenu from "./useLayoutMenu";
import { Icon } from "@iconify/react";

export type ItemClickProps = {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export type MenuProps = {
  theme?: MenuTheme;
  menuItems?: MenuItem[];
  collapsed?: boolean;
};

function AppMenu(props: MenuProps) {
  const { items, openKeys, activeKey } = useMenuStore();
  const { onItemClick, onOpenChange } = useLayoutMenu();

  const initMenuList = (menuList: MenuItem[]) => {
    const list = [];
    for (const item of menuList) {
      if (typeof item.icon === "string") {
        item.icon = <Icon fontSize={14} icon={item.icon as string}></Icon>;
      }
      const newItem = { ...item };

      if (newItem.children) {
        newItem.children = [...initMenuList(newItem.children)];
      }
      list.push(newItem);
    }

    return list;
  };

  const menuItems = initMenuList(JSON.parse(JSON.stringify(items)));

  return (
    <Menu
      theme={props.theme}
      className="overflow-y-auto flex-1 h-full"
      mode="inline"
      items={menuItems}
      openKeys={openKeys}
      selectedKeys={[activeKey]}
      inlineCollapsed={props.collapsed}
      onOpenChange={(keys) => {
        onOpenChange(keys);
      }}
      onClick={(event) => {
        onItemClick(event);
      }}
    />
  );
}

export default AppMenu;
