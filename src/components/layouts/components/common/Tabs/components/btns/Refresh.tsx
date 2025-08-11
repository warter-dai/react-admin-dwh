import { ReloadOutlined } from "@ant-design/icons";
import styles from "../../index.module.css";
import { useLayoutContext } from "../../../Content/LayoutContext";

function RefreshBtn() {
  const { onReload } = useLayoutContext();
  return (
    <div
      className={styles["btn"] + " cursor-pointer "}
      onClick={() => {
        onReload!();
      }}
    >
      <ReloadOutlined />
    </div>
  );
}

export default RefreshBtn;
