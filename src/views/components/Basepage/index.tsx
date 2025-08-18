import { Fragment, useEffect, useState, type JSX } from "react";
import SearchPanel from "./components/SearchPanel";
import TablePanel from "./components/TablePanel";
import Toolbar from "./components/Toolbar";
import styles from "./index.module.css";
import type { ColumnsType } from "antd/es/table";
import { BasePageContext } from "./useBasePageContext";

export type BasePageRef<T> = {
  dataSource: Array<T>;
};

export type BasePageProps = {
  defaultLoad?: boolean;
  formItems: any[];
  columns: ColumnsType<any>;
  toolbar?: JSX.Element;
  loadData: () => Promise<any[]>;
  ref?: React.RefObject<BasePageRef<any> | null>;
};

const BasePage = (props: BasePageProps) => {
  const onSearch = () => {
    loadData();
  };

  const onAddRow = () => {
    setDataSource([
      { id: dataSource.length + 1, key: dataSource.length + 1 },
      ...dataSource,
    ]);
  };

  const onExport = () => {
    console.log("导出");
  };

  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!props.ref) return;
    props.ref.current = {
      dataSource: dataSource,
    };
  }, [props.ref]);

  const loadData = async () => {
    const data = await props.loadData();
    setDataSource(data);
  };

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (props.defaultLoad === false) return;
    loadData();
  }, []);

  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);
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
            toolbar={
              <Fragment>
                <Toolbar onAddRow={onAddRow} onExport={onExport}>
                  {props.toolbar}
                </Toolbar>
              </Fragment>
            }
            columns={props.columns}
            dataSource={dataSource}
          ></TablePanel>
        </div>
      </div>
    </BasePageContext.Provider>
  );
};

export default BasePage;
