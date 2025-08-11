import { Layout } from "antd";

import { useGlobalContext } from "@/globalContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AppContent from "@/components/layouts/components/common/Content";
import PageHeader from "@/components/layouts/components/common/PageHeader/index";
// import AppFooter from "@/components/layouts/components/common/Footer/index";
import styles from "./index.module.css";
import { Fragment, useState } from "react";
import Logo from "../common/Logo";
import AppMenu from "../common/Menu";

function DefaultLayout() {
  const { Sider } = Layout;
  const { theme, siderWidth } = useGlobalContext();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <Layout hasSider className="h-full">
        <Sider
          theme={theme}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          width={siderWidth}
          trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
          <div className={styles["logo"]}>
            <Logo
              showTitle={!collapsed}
              style={{
                color: "var(--ant-color-text)",
                backgroundColor: "var(ant-background-container)",
                paddingLeft: "24px",
              }}
            />
          </div>
          <AppMenu theme={theme}></AppMenu>
        </Sider>
        <Layout className={`${styles["content"]}  h-full`}>
          <PageHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <AppContent />
          {/* <AppFooter></AppFooter> */}
        </Layout>
      </Layout>
    </Fragment>
  );
}

export default DefaultLayout;
