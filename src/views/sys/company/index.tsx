import BasePage, { type BasePageRef } from "@/views/components/Basepage/index";
import useConfig from "./useConfig";
import useHttpMock from "@/utils/http/useHttpMock";
import { Button } from "antd";
import { useRef } from "react";

function SysCompany() {
  const { loadData } = useHttpMock();
  const { formItems, columns } = useConfig();
  const onLoadData = async () => {
    const data = await loadData("/syscompany.json");

    return data.list;
  };

  const basePageRef = useRef<BasePageRef<any>>(null);
  //  basePageRef.current!.dataSource
  return (
    <BasePage
      ref={basePageRef}
      formItems={formItems}
      columns={columns}
      loadData={onLoadData}
      toolbar={
        <Button size="small" onClick={() => {}}>
          test
        </Button>
      }
    ></BasePage>
  );
}

export default SysCompany;
