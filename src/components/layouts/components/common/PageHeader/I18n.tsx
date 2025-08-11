// import { useTranslation } from "react-i18next";

import { Dropdown } from "antd";
import { TranslationOutlined } from "@ant-design/icons";

const I18n = () => {
  // const { i18n } = useTranslation();

  const items = [
    {
      key: "zh-CN",
      label: (
        <div>
          <span>中文</span>
        </div>
      ),
    },
    {
      key: "en",
      label: (
        <div>
          <span>English</span>
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottom"
      menu={{
        items,
        selectable: true,
        // selectedKeys: [i18n.language],
        // onClick: async ({ key }) => {
        //   // await i18n.changeLanguage(key);
        //   // changeAppLanguage(key);
        // },
      }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 120 }}
    >
      <span className="cursor-pointer transition-all">
        <TranslationOutlined style={{ fontSize: 18 }} />
      </span>
    </Dropdown>
  );
};

export default I18n;
