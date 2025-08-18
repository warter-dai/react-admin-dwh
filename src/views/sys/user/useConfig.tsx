import type { ColumnsType } from "antd/es/table";

import { Button, Form, Input, Popconfirm, Space } from "antd";

function config() {
  const formItems = [
    <Form.Item name="userName" label="用户名称" key="userName">
      <Input placeholder="用户名称" />
    </Form.Item>,
    <Form.Item name="userName" label="所属部门" key="departmentCode">
      <Input placeholder="所属部门" />
    </Form.Item>,
    <Form.Item name="userName" label="手机号码" key="phone">
      <Input placeholder="手机号码" />
    </Form.Item>,
  ];

  const columns: ColumnsType<any> = [
    {
      key: "userName",
      title: "用户名称",
      dataIndex: "userName",
      width: "200px",
    },
    {
      key: "userCode",
      title: "用户编码",
      dataIndex: "userCode",
      width: "200px",
    },
    {
      key: "departmentCode",
      title: "所属部门",
      dataIndex: "departmentCode",
      width: "200px",
    },
    {
      key: "email",
      title: "邮箱",
      dataIndex: "email",
      width: "200px",
    },
    {
      key: "phone",
      title: "手机号码",
      dataIndex: "phone",
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

  const onEdit = (row: any) => {
    console.log(row);
  };

  const onDeleteRow = (row: any) => {
    console.log(row);
  };

  return {
    formItems,
    columns,
  };
}

export default config;
