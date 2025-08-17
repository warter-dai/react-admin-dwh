import { useEffect, useState } from "react";
import SearchPanel from "./components/searchPanel";
import TablePanel from "./components/tabelPanel";
import styles from "./index.module.css";
import type { ColumnsType } from "antd/es/table";
import { BasePageContext } from "./useBasePageContext";

export type BasePageProps = {
  defaultLoad?: boolean;
  formItems: any[];
  columns: ColumnsType<any>;
  loadData: () => Promise<any[]>;
};

const BasePage = (props: BasePageProps) => {
  const onSearch = () => {
    loadData();
  };

  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);

  const loadData = async () => {
    const data = await props.loadData();
    setDataSource(data);
  };

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (props.defaultLoad === false) return;
    loadData();
  }, []);

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
            fields={props.formItems}
            onSearch={() => {
              onSearch();
            }}
            onReset={() => {
              setDataSource([]);
            }}
          ></SearchPanel>
        </div>
        <div className={styles["page-table"]}>
          <TablePanel
            columns={props.columns}
            dataSource={dataSource}
          ></TablePanel>
        </div>
      </div>
    </BasePageContext.Provider>
  );
};

export default BasePage;
