import { Button, Form, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Fragment } from "react/jsx-runtime";

function config() {
  const formItems = [
    <Form.Item
      name="permissionGroupName"
      label="权限组名称"
      key="permissionGroupName"
    >
      <Input placeholder="权限组名称" />
    </Form.Item>,
  ];

  const columns: ColumnsType<any> = [
    {
      title: "权限组名称",
      dataIndex: "permissionGroupName",
    },
    {
      title: "权限组编码",
      dataIndex: "permissionGroupCode",
    },
    {
      title: "操作",
      key: "action",
      width: "300px",
      render: (_, record) => (
        <Fragment>
          <Button
            type="link"
            onClick={() => {
              onEdit(record);
            }}
          >
            分配权限
          </Button>

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
        </Fragment>
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
