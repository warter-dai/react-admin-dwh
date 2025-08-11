import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";

import styles from "../index.module.css";

import type { JSX } from "react/jsx-runtime";
import { useBasePageContext } from "../useBasePageContext";

type ISearchProps = {
  fields: JSX.Element[];
  onSearch: () => Promise<void> | void;
  onReset?: () => Promise<void> | void;
};

const SearchPanel = ({ fields, onSearch, onReset }: ISearchProps) => {
  const [form] = Form.useForm();
  const list: JSX.Element[] = [];
  const { collapsed, toggleCollapsed } = useBasePageContext();

  const initFields = () => {
    const maxCount = collapsed ? fields.length : 7;
    for (let i = 0; i < maxCount; i++) {
      const item = fields[i];
      list.push(
        <Col span={6} key={i}>
          {item}
        </Col>
      );
    }

    return list;
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <Form
      form={form}
      name="page_search"
      className={styles["page-search-panel"]}
      onFinish={onFinish}
    >
      <Row gutter={24}>{initFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              onSearch();
            }}
          >
            查询
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
              if (onReset) onReset();
            }}
          >
            重置
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              toggleCollapsed!();
            }}
          >
            {collapsed ? <UpOutlined /> : <DownOutlined />}{" "}
            {collapsed ? "收起" : "展开"}
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchPanel;
