import { Button, Layout } from "antd";
import I18n from "./I18n";
import Breadcrumb from "./Breadcrumb";
import FullScreen from "./FullScreen";
import UserInfo from "./UserInfo";
import styles from "./index.module.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
type HeaderPorps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};
const PageHeader = (props: HeaderPorps) => {
  const toggleCollapsed = () => {
    props.toggleCollapsed();
  };

  return (
    <Header
      className={styles.header}
      style={{
        backgroundColor: "var(--ant-background-container)",
      }}
    >
      <div className={styles["header-left"]}>
        <Button
          type="text"
          onClick={() => toggleCollapsed()}
          style={{ width: "auto", padding: 0 }}
        >
          {props.collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: 20 }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: 20 }} />
          )}
        </Button>
        <Breadcrumb />
      </div>

      <div className={styles["header-right"]}>
        <I18n />
        <FullScreen />
        <UserInfo />
      </div>
    </Header>
  );
};

export default PageHeader;
