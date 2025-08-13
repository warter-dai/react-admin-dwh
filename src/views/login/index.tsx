import { Button, Divider, Form, Input, type FormInstance } from "antd";
import styles from "./index.module.css";
import { Checkbox } from "antd/lib";
import {
  AlipayCircleOutlined,
  GithubOutlined,
  WechatOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { useEffect, useRef } from "react";
import AppLogo from "@/components/layouts/components/common/Logo";

import { APP_TITLE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import Animator from "@/components/Animator";

function Login() {
  const remeberMe = useRef(true);
  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();

  useEffect(() => {
    formRef.current?.setFieldsValue({ username: "admin", password: "admin" });
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onLogin = async () => {
    try {
      await formRef.current?.validateFields();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles["login-panel"]}>
      <div className={styles["login-logo"]}>
        <AppLogo style={{ fontSize: 40 }}></AppLogo>
        {APP_TITLE}
      </div>
      <Animator
        style={{ display: "flex", flex: 1 }}
        config={{
          type: "fadeLeft",
          duration: 0.4,
        }}
      >
        <div className={styles["login-left"]}>
          <div className={styles["header"]}>
            <div className={styles["login-content-logo"]}>
              <AppLogo style={{ fontSize: 40 }}></AppLogo>
              {APP_TITLE}
            </div>
          </div>
          <div className={styles["content"]}>
            <h1>欢迎使用</h1>
            <h4>开箱即用</h4>
          </div>
        </div>
      </Animator>
      <Animator
        style={{ display: "flex", flex: 1, height: "audio" }}
        config={{
          type: "fadeRight",
          duration: 0.4,
        }}
      >
        <div className={styles["login-content"]}>
          <h1 className={styles["login-title"]}>登录</h1>
          <div>
            <Form
              ref={formRef}
              layout="vertical"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: "请输入您的账号!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入您的密码!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <div className={styles["forget"]}>
                  <Checkbox
                    checked={remeberMe.current}
                    title="勾选后自动记录登录信息"
                  >
                    记住我
                  </Checkbox>
                  <Button type="link">忘记密码</Button>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="w-full"
                  onClick={() => {
                    onLogin();
                  }}
                >
                  登录
                </Button>
              </Form.Item>
              <Form.Item>
                <Button className="w-full">注册</Button>
              </Form.Item>
              <Divider className={styles["other-line"]}>其他登录方式</Divider>
              <Form.Item>
                <div className={styles["logo-menu"]}>
                  <WechatOutlined style={{ fontSize: 30 }} />
                  <AlipayCircleOutlined style={{ fontSize: 30 }} />
                  <WeiboOutlined style={{ fontSize: 30 }} />
                  <GithubOutlined style={{ fontSize: 30 }} />
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Animator>
    </div>
  );
}

export default Login;
