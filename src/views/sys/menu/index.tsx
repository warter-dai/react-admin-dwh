import BasePage from "@/views/components/Basepage/index";
import useConfig from "./useConfig";
import useHttpMock from "@/utils/http/useHttpMock";

function SysMenu() {
  const { loadData } = useHttpMock();
  const { formItems, columns } = useConfig();
  const onLoadData = async () => {
    const data = await loadData("/sysmenu.json");

    return data.list;
  };

  return (
    <BasePage
      formItems={formItems}
      columns={columns}
      loadData={onLoadData}
    ></BasePage>
  );
}

export default SysMenu;
