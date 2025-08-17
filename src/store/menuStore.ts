import { create } from "zustand";
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
  items: [],
  setItems: (items: MenuItem[]) => set(() => ({ items: items })),
}));

export default useMenuStore;
