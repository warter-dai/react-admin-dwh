import { create } from "zustand";
import { createStorage } from "./createStorage";
import { TOKE_KEY } from "@/utils/constants";

export type UserState = {
  /**登录用户信息 */
  userInfo?: any;
  tokenKey: string;
  /** 有效koken */
  token: string;
  /** 权限菜单 */
  roleRouters?: RouteMenuItem[];
  /** 记住我 */
  rememberMe: boolean;
  setToken: (token: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setUserInfo: (userInfo: Record<string, any>) => void;
  setRoleRouters: (roleRouters: RouteMenuItem[]) => void;
};

const storage = createStorage("sessionStorage");
const storageLocal = createStorage("localStorage");

const useUserStore = create<UserState>()((set) => ({
  token: storage.getStorage("token") || "",
  tokenKey: TOKE_KEY,
  rememberMe: storageLocal.getStorage("rememberMe") || true,
  userInfo: storage.getStorage("userInfo") || {},
  roleRouters: storage.getStorage("roleRouters") || [],
  setToken: (token: string) => {
    set(() => {
      storage.setStorage("token", token);
      return { token: token };
    });
  },
  setRememberMe: (rememberMe: boolean) => {
    set(() => {
      storageLocal.setStorage("rememberMe", rememberMe);
      return { rememberMe: rememberMe };
    });
  },
  setUserInfo: (userInfo: Record<string, any>) => {
    set(() => {
      storage.setStorage("userInfo", userInfo);
      return { userInfo: userInfo };
    });
  },
  setRoleRouters: (roleRouters: RouteMenuItem[]) => {
    set(() => {
      storage.setStorage("roleRouters", roleRouters);
      return { roleRouters: roleRouters };
    });
  },
}));

export default useUserStore;
