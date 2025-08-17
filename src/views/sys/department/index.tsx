import BasePage from "@/views/components/Basepage/index";
import { formItems, columns } from "./config";
import useHttpMock from "@/utils/http/useHttpMock";

function SysDepartment() {
  const { loadData } = useHttpMock();
  const loadCompany = async () => {
    const data = await loadData("/sysdepartment.json");

    return data.list;
  };

  return (
    <BasePage
      formItems={formItems}
      columns={columns}
      loadData={loadCompany}
    ></BasePage>
  );
}

export default SysDepartment;
