import menuStore from "@/store/menuStore";

import { Menu, type MenuTheme } from "antd";
import useLayoutMenu from "./useLayoutMenu";
import { Icon } from "@iconify/react";
import { Fragment, useEffect, useState } from "react";

export type ItemClickProps = {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export type MenuProps = {
  theme?: MenuTheme;
  // menuItems?: MenuItem[];
  collapsed?: boolean;
  searchKey?: string;
};

function AppMenu(props: MenuProps) {
  const { items, openKeys, activeKey } = menuStore();
  const { onItemClick, onOpenChange } = useLayoutMenu();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [defaultMenuItems, setDefaultMenuItems] = useState<MenuItem[]>([]);

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

  const filterMenus = (key: string, menuItems: MenuItem[]) => {
    const searckKey = key.trim();
    if (!searckKey) return menuItems;
    const result: MenuItem[] = [];
    menuItems.forEach((item, i) => {
      const labelSplit = item
        .label!.toString()
        .replace(searckKey, `||||${searckKey}||||`)
        .split("||||");

      const searchLabel = labelSplit.map((label) => {
        if (label === searckKey) {
          return (
            <span key={"menu_label" + i} style={{ color: "red" }}>
              {searckKey}
            </span>
          );
        }

        return label;
      });

      if (item.label?.toString().includes(searckKey)) {
        result.push({ ...item, label: searchLabel });
      } else if (item.children && item.children.length > 0) {
        const citem = filterMenus(searckKey, item.children);
        if (citem.length > 0) {
          const newItem = { ...item, label: searchLabel };
          newItem.children = [...citem];
          result.push({ ...newItem });
        }
      }
    });

    return result;
  };

  useEffect(() => {
    const menuList = initMenuList(JSON.parse(JSON.stringify(items)));

    setDefaultMenuItems(menuList);
  }, [items]);

  useEffect(() => {
    setMenuItems(defaultMenuItems);
  }, [defaultMenuItems]);

  useEffect(() => {
    setMenuItems(filterMenus(props.searchKey!, defaultMenuItems));
  }, [props.searchKey]);

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default AppMenu;
