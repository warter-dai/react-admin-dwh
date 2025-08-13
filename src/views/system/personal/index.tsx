import useUserStore from "@/store/userStore";
import { Avatar, Card, Divider } from "antd";
import styles from "./index.module.css";

function Personal() {
  const { userInfo } = useUserStore();

  return (
    <div className={styles["personal-panel"]}>
      <div className={styles["info-panel"]}>
        <Card title="个人信息">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              style={{ width: 100, height: 100 }}
              src={
                <img src="https://avatars.githubusercontent.com/u/9713188?v=4" />
              }
            />
          </div>

          <Divider></Divider>
          <div className={styles["item"]}>
            <label>账号：</label>
            <div>{userInfo?.userName}</div>
          </div>
          <Divider></Divider>
          <div className={styles["item"]}>
            <label>邮箱：</label>
            <div>{userInfo?.email}</div>
          </div>
          <Divider></Divider>
          <div className={styles["item"]}>
            <label>手机：</label>
            <div>{userInfo?.phone}</div>
          </div>
        </Card>
      </div>
      <div className={styles["base-panel"]}>
        <Card title="部门信息">
          <div className={styles["item"]}>
            <label>所属部门：</label>
            <div>xxx</div>
          </div>
          <Divider></Divider>
          <div className={styles["item"]}>
            <label>所属上级：</label>
            <div>xxx</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Personal;
