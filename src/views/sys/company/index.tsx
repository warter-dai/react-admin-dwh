import BasePage, { type BasePageRef } from "@/views/components/Basepage/index";
import useConfig from "./useConfig";
import useHttpMock from "@/utils/http/useHttpMock";
// import { Button } from "antd";
import { useRef, useState } from "react";

function SysCompany() {
  const { loadData } = useHttpMock();
  const [dataSourece, setDataSource] = useState<Array<any>>();
  const { formItems, columns } = useConfig({
    onDeleteRow: (row: any) => {
      const data = dataSourece || [];
      const index = dataSourece!.indexOf(row);
      data?.splice(index, 1);
      setDataSource([...data]);
    },
    onEdit: (row: any) => {
      console.log(row);
    },
  });
  const onLoadData = async () => {
    const data = await loadData("/syscompany.json");

    return data.list;
  };

  const onDataSourceUpdate = (data: Array<any>) => {
    setDataSource(data);
  };

  const basePageRef = useRef<BasePageRef<any>>(null);
  //  basePageRef.current!.dataSource
  return (
    <BasePage
      ref={basePageRef}
      formItems={formItems}
      columns={columns}
      loadData={onLoadData}
      onDataSourceUpdate={onDataSourceUpdate}
      dataSource={dataSourece}
      // toolbar={
      //   <Button size="small" onClick={() => {}}>
      //     test
      //   </Button>
      // }
    ></BasePage>
  );
}

export default SysCompany;
