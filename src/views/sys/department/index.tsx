import BasePage from "@/views/components/Basepage/index";
import useConfig from "./useConfig";
import useHttpMock from "@/utils/http/useHttpMock";
import { useState } from "react";

function SysDepartment() {
  const { loadData } = useHttpMock();
  const [dataSource, setDataSource] = useState<Array<any>>();
  const { formItems, columns } = useConfig({
    onDeleteRow: (row: any) => {
      const data = dataSource || [];
      const index = dataSource!.indexOf(row);
      data?.splice(index, 1);
      setDataSource([...data]);
    },
    onEdit: (row: any) => {
      console.log(row);
    },
  });
  const onLoadData = async () => {
    const data = await loadData("/sysdepartment.json");

    return data.list;
  };

  const onDataSourceUpdate = (data: Array<any>) => {
    setDataSource(data);
  };

  return (
    <BasePage
      formItems={formItems}
      columns={columns}
      loadData={onLoadData}
      dataSource={dataSource}
      onDataSourceUpdate={onDataSourceUpdate}
    ></BasePage>
  );
}

export default SysDepartment;
