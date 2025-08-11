import { useEffect, useState } from "react";

import { Form, Input } from "antd";

import SearchPanel from "./components/searchPanel";
import TablePanel from "./components/tabelPanel";
import styles from "./index.module.css";
import type { ColumnsType } from "antd/es/table";
import { BasePageContext } from "./useBasePageContext";

const BasePage = () => {
  const initFields = () => {
    return [
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage1">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage2">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage3">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage4">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage5">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage6">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage7">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage8">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage9">
        <Input placeholder="Basic usage" />
      </Form.Item>,
      <Form.Item name="Basic usage" label="Basic usage" key="Basic usage10">
        <Input placeholder="Basic usage" />
      </Form.Item>,
    ];
  };

  const onSearch = () => {
    setDataSource([...dataSource, { key: dataSource.length + 1 }]);
  };

  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({ key: i });
    }
    setDataSource(data);
  }, []);

  const columns: ColumnsType<any> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: true,

      width: "200px",
    },
    {
      key: "name1",
      title: "Name",
      dataIndex: "name",
      sorter: true,

      width: "200px",
    },
    {
      key: "name2",
      title: "Name",
      dataIndex: "name",
      sorter: true,

      width: "200px",
    },
    {
      key: "name3",
      title: "Name",
      dataIndex: "name",
      sorter: true,

      width: "200px",
    },
    {
      key: "name4",
      title: "Name",
      dataIndex: "name",
      sorter: true,

      width: "200px",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  // const collapsed = useRef(false);

  return (
    <BasePageContext.Provider
      value={{
        collapsed: collapsed,
        toggleCollapsed: () => {
          setCollapsed(!collapsed);
        },
      }}
    >
      <div className={styles["page-panel"]}>
        <div className={styles["page-search"]}>
          <SearchPanel
            fields={initFields()}
            onSearch={() => {
              onSearch();
            }}
            onReset={() => {
              setDataSource([]);
            }}
          ></SearchPanel>
        </div>
        <div className={styles["page-table"]}>
          <TablePanel columns={columns} dataSource={dataSource}></TablePanel>
        </div>
      </div>
    </BasePageContext.Provider>
  );
};

export default BasePage;
