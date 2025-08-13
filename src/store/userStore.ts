import { create } from "zustand";
import { createStorage } from "./createStorage";
import { TOKE_KEY } from "@/utils/constants";

type UserInfoType = {
  userName?: string;
  email: string;
  phone: string;
};

export type UserState = {
  /**登录用户信息 */
  userInfo?: UserInfoType;
  tokenKey: string;
  /** 有效koken */
  token: string;
  /** 权限菜单 */
  roleRouters?: RouteMenuItem[];
  /** 记住我 */
  rememberMe: boolean;
  setToken: (token: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setUserInfo: (userInfo: UserInfoType) => void;
  setRoleRouters: (roleRouters: RouteMenuItem[]) => void;
};

const storage = createStorage("sessionStorage");
const storageLocal = createStorage("localStorage");

const useUserStore = create<UserState>()((set) => ({
  token: storage.getStorage("token") || "",
  tokenKey: TOKE_KEY,
  rememberMe: storageLocal.getStorage("rememberMe") ?? true,
  userInfo: storage.getStorage<UserInfoType>("userInfo") || {},
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
  setUserInfo: (userInfo: UserInfoType) => {
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
