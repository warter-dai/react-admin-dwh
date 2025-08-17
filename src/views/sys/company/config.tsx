import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

export const formItems = [
  <Form.Item name="companyName" label="公司名称" key="companyName">
    <Input placeholder="公司名称" />
  </Form.Item>,
];

export const columns: ColumnsType<any> = [
  {
    key: "companyName",
    title: "公司名称",
    dataIndex: "companyName",
    width: "200px",
  },
  {
    key: "companyCode",
    title: "公司编码",
    dataIndex: "companyCode",
    sorter: true,

    width: "200px",
  },
];
