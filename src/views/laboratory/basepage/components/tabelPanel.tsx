import { useEffect, useRef, useState } from "react";

import { Table } from "antd/lib";

import type { ColumnsType, TableProps, TableRef } from "antd/es/table";
import { useBasePageContext } from "../useBasePageContext";
import { useSleep } from "@/hooks/useSleep";

type ITableProps = {
  columns: ColumnsType<any>;
  selectionType?: "checkbox" | "radio";
  tableParams?: TableProps;
  dataSource: Array<any>;
};

const TablePanel = ({
  columns = [],
  selectionType = "checkbox",
  tableParams = {
    pagination: {
      pageSize: 20,
    },
  },
  dataSource = [],
}: ITableProps) => {
  const [rowSelection] = useState({});
  const tableRef = useRef<TableRef>(null);
  const [scrollY, setScrollY] = useState(Number(tableParams.scroll?.y) || 0);
  const { collapsed } = useBasePageContext();
  const { clearSleep, sleep } = useSleep();
  const timer = 0;

  const initTableHeight = async (timeSpan: number = 0) => {
    clearSleep();
    await sleep(timeSpan);
    const header = tableRef.current?.nativeElement.querySelector(
      ".ant-table-thead"
    ) as HTMLDivElement;
    const pagination = tableRef.current?.nativeElement.querySelector(
      ".ant-table-pagination"
    ) as HTMLDivElement;

    let [
      headerHeight,
      paginationHeight,
      paginationMarginTop,
      paginationMarginBottom,
    ] = [0, 0, 0, 0];

    const tableHeight =
      tableRef.current?.nativeElement.parentElement?.offsetHeight || 0;

    if (pagination) {
      const cssStyle = window.getComputedStyle(pagination);
      paginationMarginTop = parseFloat(cssStyle.marginTop || "0");

      paginationMarginBottom = parseFloat(cssStyle.marginBottom || "0");
      paginationHeight = pagination.offsetHeight;
    }

    if (header) {
      headerHeight = Number(header.offsetHeight);
    }

    const tableHScrollHeight =
      tableHeight -
      headerHeight -
      paginationHeight -
      paginationMarginBottom -
      paginationMarginTop;

    setScrollY(tableHScrollHeight);
    clearSleep();
    await sleep(timeSpan);
    // console.log("表格高度自动计算");
  };

  const tablePanelHeight = useRef(0);
  const tablePanelParentHeight = useRef(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entrys) => {
      for (const entry of entrys) {
        // 表格高度
        const newHeight = entry.contentRect.height;
        // 表格上级容器高度
        const newParentHeight = entry.target.parentElement!.offsetHeight;

        // 只有当高度度变化时才更新状态
        if (
          newHeight !== tablePanelHeight.current ||
          newParentHeight !== tablePanelParentHeight.current
        ) {
          initTableHeight(timer);
          tablePanelHeight.current = newHeight;
          tablePanelParentHeight.current = newParentHeight;
        }
      }
    });
    // 监听表格
    resizeObserver.observe(tableRef.current!.nativeElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    initTableHeight(timer);
  }, [collapsed]);

  return (
    <Table
      size="small"
      ref={tableRef}
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      pagination={{ ...tableParams.pagination, size: "small" }}
      dataSource={dataSource}
      scroll={{ y: scrollY, x: true }}
      {...tableParams}
    />
  );
};

export default TablePanel;
