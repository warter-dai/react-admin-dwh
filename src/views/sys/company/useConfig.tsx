import { Button, Form, Input, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

function config() {
  const formItems = [
    <Form.Item name="companyName" label="公司名称" key="companyName">
      <Input placeholder="公司名称" />
    </Form.Item>,
  ];

  const columns: ColumnsType<any> = [
    {
      title: "公司名称",
      dataIndex: "companyName",
    },
    {
      title: "公司编码",
      dataIndex: "companyCode",
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
