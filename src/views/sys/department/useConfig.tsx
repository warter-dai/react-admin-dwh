import type { ColumnsType } from "antd/es/table";

import { Button, Form, Input, Popconfirm, Space } from "antd";
import ScmSelect from "@/views/components/Basepage/Select";

type ConfigProps = {
  onDeleteRow: (row: any) => Promise<void> | void;
  onEdit: (row: any) => Promise<void> | void;
};

function config({ onDeleteRow, onEdit }: ConfigProps) {
  const formItems = [
    <Form.Item name="companyCode" label="所属公司" key="companyCode">
      <ScmSelect
        url="/syscompany.json"
        labelField="companyName"
        valueField="companyCode"
        placeholder="所属公司"
      />
    </Form.Item>,
    <Form.Item name="departmentName" label="部门名称" key="departmentName">
      <Input placeholder="部门名称" />
    </Form.Item>,
  ];

  const columns: ColumnsType<any> = [
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
    {
      title: "操作",
      key: "action",

      width: "200px",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              onEdit(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="是否确认删除？"
            onConfirm={() => onDeleteRow(record)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return {
    formItems,
    columns,
  };
}

export default config;
