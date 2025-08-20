import { Fragment, useEffect, useRef, useState, type JSX } from "react";
import SearchPanel from "./components/searchPanel";
import TablePanel from "./components/TablePanel";
import Toolbar from "./components/Toolbar";
import styles from "./index.module.css";
import type { ColumnsType, TableRef } from "antd/es/table";
import { BasePageContext } from "./useBasePageContext";
import type { FormInstance } from "antd";
import { useSleep } from "@/hooks/useSleep";

export type BasePageRef<T> = {
  dataSource: Array<T>;
  tablePanelRef: React.RefObject<TableRef | null>;
  searchPanelRef: React.RefObject<FormInstance | null>;
};

export type BasePageProps = {
  defaultLoad?: boolean;
  formItems: any[];
  columns: ColumnsType<any>;
  toolbar?: JSX.Element;
  loadData: <T>(searchParams?: T) => Promise<any[]>;
  dataSource?: Record<string, any>[];
  ref?: React.RefObject<BasePageRef<any> | null>;
  onDataSourceUpdate?: <T>(data: Array<T>) => void;
};

const BasePage = (props: BasePageProps) => {
  const [dataSource, setDataSource] = useState(props.dataSource);
  const searchPanelRef = useRef<FormInstance>(null);
  const tablePanelRef = useRef<TableRef>(null);
  const [loading, setLoading] = useState(false);
  const { sleep } = useSleep();
  const onSearch = () => {
    loadData();
  };

  const onAddRow = () => {
    const key = new Date().getTime();
    setDataSource([
      {
        id: key,
        key: key,
      },
      ...dataSource!,
    ]);
  };

  const onExport = () => {
    console.log("导出");
  };

  useEffect(() => {
    if (props.defaultLoad === false) return;
    loadData();
  }, []);

  useEffect(() => {
    setDataSource(props.dataSource!);
  }, [props.dataSource]);

  useEffect(() => {
    if (props.onDataSourceUpdate && dataSource)
      props.onDataSourceUpdate(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (props.ref) {
      props.ref.current = {
        dataSource: dataSource!,
        tablePanelRef: tablePanelRef,
        searchPanelRef: searchPanelRef,
      };
    }
  }, [dataSource, tablePanelRef, searchPanelRef]);

  const loadData = async () => {
    const param = searchPanelRef.current?.getFieldsValue();
    try {
      setLoading(true);
      await sleep(100);
      const data: Array<any> = await props.loadData(param);
      setDataSource(data);
    } finally {
      setLoading(false);
    }
  };

  const [collapsed, setCollapsed] = useState(false);

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
            ref={searchPanelRef}
            fields={props.formItems}
            onSearch={() => {
              onSearch();
            }}
            onReset={() => {
              props.onDataSourceUpdate!([]);
            }}
          ></SearchPanel>
        </div>

        <div className={styles["page-table"]}>
          <TablePanel
            ref={tablePanelRef}
            loading={loading}
            toolbar={
              <Fragment>
                <Toolbar onAddRow={onAddRow} onExport={onExport}>
                  {props.toolbar}
                </Toolbar>
              </Fragment>
            }
            columns={props.columns}
            dataSource={dataSource || []}
          ></TablePanel>
        </div>
      </div>
    </BasePageContext.Provider>
  );
};

export default BasePage;
