import { useNavigate } from "react-router-dom";
import { App } from "antd";
import useUserStore from "@/store/userStore";

export type loginProps = {
  token: string;
  userInfo: any;
  roleRouters: RouteMenuItem[];
};

function useLogin() {
  const navigate = useNavigate();
  const { setToken, setUserInfo, setRoleRouters } = useUserStore();
  const { modal } = App.useApp();

  const logoutConfirm = () => {
    modal.confirm({
      title: "登出提醒",
      content: "是否确认退出？",

      onOk: () => {
        logout();
      },
    });
  };

  const reset = () => {
    setToken("");
    setUserInfo({});
    setRoleRouters([]);
    navigate("/login", { replace: true });
  };
  const logout = () => {
    reset();
  };

  const setLoginData = ({ token, userInfo, roleRouters }: loginProps) => {
    setToken(token);
    setUserInfo(userInfo);
    setRoleRouters(roleRouters);
  };

  return {
    logout,
    logoutConfirm,
    setLoginData,
  };
}

export default useLogin;
