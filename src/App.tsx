import { RouterProvider } from "react-router-dom";

import { ConfigProvider, App as AntApp } from "antd";
import { GlobalContext } from "@/globalContext";
import useI18n from "@/i18n/useI18n";
import router from "@/router/index";
import { addCollection } from "@iconify/react";
import { icons as antdIcons } from "@iconify-json/ant-design";
import "@ant-design/v5-patch-for-react-19";

addCollection(antdIcons);

import "./App.css";
import { useRef } from "react";

function App() {
  const theme = "light";
  const { antdLanguage } = useI18n();
  return (
    <GlobalContext.Provider
      value={{
        theme,
        siderWidth: 240,
        collapsedSider: useRef(false),
      }}
    >
      <ConfigProvider
        locale={antdLanguage}
        theme={{
          // cssVar: { key: RA_ANTD_APP_CSS_TOKEN_KEY },
          hashed: false,
          // algorithm:
          //   theme === "dark"
          //     ? [antdTheme.darkAlgorithm]
          //     : [antdTheme.defaultAlgorithm],
          token: {
            // colorPrimary: primaryColor,
            // colorInfo: primaryColor,
            borderRadius: 4,
          },
          components: {
            Form: {
              itemMarginBottom: 14,
            },
            Layout: {
              headerHeight: 48,
              headerPadding: "0 16px",
              footerPadding: "8px 16px",
            },
            Menu: {
              collapsedWidth: 80,
            },
          },
        }}
      >
        <AntApp className="w-full h-full">
          <RouterProvider router={router} />
        </AntApp>
        {/* <LockScreen /> */}
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
