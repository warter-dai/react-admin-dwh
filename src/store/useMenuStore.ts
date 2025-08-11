import { create } from "zustand";

import type { MenuItem } from "@/types/global";
import { createStorage } from "./createStorage";

interface MenuState {
  /** 激活的选项 */
  activeKey: string;
  /** 打开的选项 */
  openKeys: string[];

  items: MenuItem[];
  setItems: (items: any[]) => void;
  setActiveKey: (key: string) => void;
  setOpenKeys: (keys: string[]) => void;
}

const storage = createStorage("localStorage");

const defaultItem = [
  {
    label: "关于",
    key: "/about1",
    path: "/about1",
    icon: "ant-design:search",
    children: [
      {
        label: "关于1",
        key: "/about",
        path: "/about",
        icon: "ant-design:setting",
      },
      {
        label: "表格类页面",
        key: "/tabpage",
        path: "/tabpage",
        icon: "ant-design:piechart",
        children: [
          {
            label: "基础页面",
            key: "/basepage",
            path: "/basepage",
            icon: "ant-design:setting",
          },
          {
            label: "列表页",
            key: "/listpage",
            path: "/listpage",
            icon: "ant-design:container",
          },
        ],
      },
    ],
  },
  {
    label: "我的代办",
    key: "workspace",
    path: "workspace",
    icon: "ant-design:schedule",
    children: [
      {
        label: "工作计划",
        key: "/workspace",
        path: "/workspace",
        icon: "ant-design:container",
      },
    ],
  },
  {
    label: "测试页",
    key: "page",
    path: "page",
    icon: "ant-design:schedule",
    children: [
      {
        label: "页面1",
        key: "/page1",
        path: "/page1",
        icon: "ant-design:container",
      },
      {
        label: "页面6",
        key: "/page6",
        path: "/page6",
        icon: "ant-design:container",
      },
      {
        label: "页面2",
        key: "/page2",
        path: "/page2",
        icon: "ant-design:container",
      },
      {
        label: "页面3",
        key: "/page3",
        path: "/page3",
        icon: "ant-design:container",
      },
      {
        label: "页面4",
        key: "/page4",
        path: "/page4",
        icon: "ant-design:container",
      },
      {
        label: "页面5",
        key: "/page5",
        path: "/page5",
        icon: "ant-design:container",
      },
    ],
  },
];

const useMenuStore = create<MenuState>()((set) => ({
  openKeys: storage.getStorage("openKeys") || [],
  setOpenKeys: (keys: string[]) => {
    storage.setStorage("openKeys", keys);
    set(() => {
      return { openKeys: keys };
    });
  },
  activeKey: storage.getStorage("activeKey"),
  setActiveKey: (key: string) => {
    storage.setStorage("activeKey", key);
    set(() => {
      return { activeKey: key };
    });
  },
  items: defaultItem,
  setItems: (items: MenuItem[]) => set(() => ({ items: items })),
}));

export default useMenuStore;
