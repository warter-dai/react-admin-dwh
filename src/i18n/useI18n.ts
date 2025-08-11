import { useMemo, useState } from "react";

import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";

const useI18n = () => {
  const appLanguageMap = Object.freeze<Record<string, string>>({
    en: "en",
    zh: "en",
  });
  const [appLanguage] = useState("zh");
  const antdLanguage = useMemo(() => {
    if (appLanguageMap[appLanguage] === "en") return enUS;
    return zhCN;
  }, [appLanguage]);
  return { antdLanguage };
};

export default useI18n;
