import { SettingOutlined } from "@ant-design/icons";
import styles from "../../index.module.css";

function SettingBtn() {
  return (
    <div className={styles["btn"] + " cursor-pointer "}>
      <SettingOutlined />
    </div>
  );
}

export default SettingBtn;
