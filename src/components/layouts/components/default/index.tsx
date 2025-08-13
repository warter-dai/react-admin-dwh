import { Input, Layout } from "antd";

import { useGlobalContext } from "@/globalContext";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AppContent from "@/components/layouts/components/common/Content";
import PageHeader from "@/components/layouts/components/common/PageHeader/index";
import styles from "./index.module.css";
import { Fragment, useEffect, useState } from "react";
import Logo from "../common/Logo";
import AppMenu from "../common/Menu";
import { useSleep } from "@/hooks/useSleep";
import { request } from "@/utils/http";
import useMenuStore from "@/store/menuStore";
import useUserStore from "@/store/userStore";

function DefaultLayout() {
  const { Sider } = Layout;
  const { theme, siderWidth } = useGlobalContext();
  const [collapsed, setCollapsed] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const { setItems } = useMenuStore();
  const { setUserInfo } = useUserStore();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const loadUserInfo = async () => {
    const userinfo: { menus: any[]; userInfo: any } = await request(
      "/react-admin-dwh/data/userinfo.json",
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    setItems(userinfo.menus);
    setUserInfo(userinfo.userInfo);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const { sleep, clearSleep } = useSleep();

  const onSearch = async (value: string) => {
    clearSleep();
    await sleep(200);
    setSearchKey(value);
  };

  return (
    <Fragment>
      <Layout hasSider className="h-full">
        {}
        <Sider
          className={styles["sider"]}
          theme={theme}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          width={siderWidth}
          trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
          <div className={styles["sider"]}>
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
            <Input
              onChange={async (e) => {
                onSearch(e.target.value);
              }}
              placeholder="请输入菜单名..."
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
            />
            <AppMenu theme={theme} searchKey={searchKey}></AppMenu>
          </div>
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
