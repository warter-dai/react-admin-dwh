import { Avatar, Popover } from "antd";

import styles from "./index.module.css";

import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useLogin from "@/hooks/useLogin";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { logoutConfirm } = useLogin();
  const { userInfo } = useUserStore();
  const nav = useNavigate();
  const handleLogout = async () => {
    logoutConfirm();
  };

  const goToUserInfo = () => {
    nav("/personal/center");
  };

  const content = (
    <div className={styles["user-info-content"]}>
      <div className={styles["user-info-item"]} onClick={goToUserInfo}>
        <span className="flex">
          <ProfileOutlined style={{ fontSize: 16 }} />
          <span style={{ marginLeft: 6 }}>个人中心</span>
        </span>
        <span></span>
      </div>

      <div className={styles["user-info-item"]} onClick={handleLogout}>
        <span className="flex items-center">
          <LogoutOutlined style={{ fontSize: 16 }} />
          <span style={{ marginLeft: 6 }}>登出</span>
        </span>
        <span></span>
      </div>
    </div>
  );
  return (
    <Popover
      trigger={["click"]}
      content={content}
      arrow
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        <Avatar size={30} icon={<UserOutlined />} />
        <span style={{ paddingLeft: "5px" }}>{userInfo?.userName}</span>
      </div>
    </Popover>
  );
};

export default UserInfo;
