import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

export const formItems = [
  <Form.Item name="departmentCode" label="部门名称" key="departmentCode">
    <Input placeholder="部门名称" />
  </Form.Item>,
];

export const columns: ColumnsType<any> = [
  {
    key: "companyName",
    title: "所属公司",
    dataIndex: "companyName",
    width: "200px",
  },
  {
    key: "departmentName",
    title: "部门名称",
    dataIndex: "departmentName",
    width: "200px",
  },
  {
    key: "departmentCode",
    title: "部门编码",
    dataIndex: "departmentCode",
    sorter: true,

    width: "200px",
  },
];
