import { create } from "zustand";
import type { TabItemType } from "@/components/layouts/components/common/Tabs/types";
import { createStorage } from "./createStorage";

interface TabsState {
  activeKey: string;
  tabItems: Partial<TabItemType>[];
  setTabItems: (items: Partial<TabItemType>[]) => void;

  setActiveKey: (key: string) => void;
  addTab: (item: TabItemType) => void;
  removeTab: (item: Partial<TabItemType> | string) => void;
}

const storage = createStorage("localStorage");

const useTabsStore = create<TabsState>()((set) => ({
  activeKey: "",
  setActiveKey: (key: string) => {
    storage.setStorage("activeKey", key);
    set(() => {
      return { activeKey: key };
    });
  },
  tabItems: storage.getStorage<TabItemType[]>("tabs") || [],
  setTabItems: (items: Partial<TabItemType>[]) => {
    storage.setStorage("tabs", items);
    set(() => {
      return { tabItems: items };
    });
  },
  addTab: (tab: Partial<TabItemType>) => {
    set((state) => {
      const items: Partial<TabItemType>[] = [...state.tabItems];
      // 查找新增tab是否已存在
      const item = items.find((item) => {
        return item.key === tab.key;
      });
      if (!item) {
        tab.path = tab.path || tab.key;
        items.push(tab);
      } else {
        item.path = tab.path || tab.key;
      }
      // 设置当前激活页签
      state.setActiveKey(tab.key!);
      // 更新缓存
      storage.setStorage("tabs", items);
      return { tabItems: items };
    });
  },
  removeTab: (tab: Partial<TabItemType> | string) => {
    set((state) => {
      const tabItems: Partial<TabItemType>[] = [...state.tabItems];
      // 查找需要删除的对象索引
      const index = tabItems.findIndex((item) => {
        if (typeof tab === "string") {
          return item.key === tab;
        } else {
          return item.key === tab.key;
        }
      });
      if (index < 0) return {};

      // 删除激活选项卡
      const isRemoveActiv = tabItems[index].key === state.activeKey;
      tabItems.splice(index, 1);

      if (isRemoveActiv && tabItems.length > 0) {
        const activIndex = Math.min(index, tabItems.length - 1);
        const newActivItem = tabItems[activIndex];
        state.setActiveKey(newActivItem.key!);
      }
      // 更新缓存
      storage.setStorage("tabs", tabItems);
      return { tabItems: tabItems };
    });
  },
}));

export default useTabsStore;
