import RefreshBtn from "./Refresh";
import styles from "../../index.module.css";
import SettingBtn from "./setting";

function TabBtns() {
  return (
    <div className={styles["btns"]}>
      <RefreshBtn></RefreshBtn>
      <SettingBtn></SettingBtn>
    </div>
  );
}

export default TabBtns;
