import { Button } from "antd";
import styles from "./404.module.css";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const onclick = () => {
    navigate("/");
  };

  return (
    <div className={styles["main"]}>
      {/* <div className={styles["left"]}></div> */}
      <div className={styles["right"]}>
        <div className={styles["title"]}>404</div>
        <h3>您寻找的页面不存在，点击下面返回按钮返回首页</h3>
        <Button onClick={onclick} type="primary" icon={<RollbackOutlined />}>
          返回首页
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
