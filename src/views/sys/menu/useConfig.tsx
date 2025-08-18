import { Button, Form, Input, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Fragment } from "react/jsx-runtime";

function config() {
  const formItems = [
    <Form.Item name="menuName" label="菜单名称" key="menuName">
      <Input placeholder="菜单名称" />
    </Form.Item>,
  ];

  const columns: ColumnsType<any> = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "路径地址",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "操作",
      key: "action",
      width: "200px",
      render: (_, record) => (
        <Fragment>
          <Button
            type="link"
            onClick={() => {
              onEdit(record);
            }}
          >
            添加子级
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
