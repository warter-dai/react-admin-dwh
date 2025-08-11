import { Avatar, Popover } from "antd";

import styles from "./index.module.css";

import useGoto from "@/hooks/useGoto";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const UserCenter = () => {
  const { go } = useGoto();
  const handleLogout = async () => {
    try {
      go("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const content = (
    <div className={styles["user-info-content"]}>
      <div className={styles["user-info-item"]}>
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
      <Avatar size={30} icon={<UserOutlined />} />
    </Popover>
  );
};

export default UserCenter;
