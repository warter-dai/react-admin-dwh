import { useMemo, useState } from "react";

import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import type { Locale } from "antd/es/locale";
import { createStorage } from "@/store/createStorage";

export type LanguageType = "en-US" | "zh-CN";

const useI18n = () => {
  const appLanguageMap: Record<string, Locale> = {
    "en-US": enUS,
    "zh-CN": zhCN,
  };

  const storage = createStorage("localStorage");

  const defaultLanguage =
    storage.getStorage<string>("language") || navigator.language || "zh-CN";

  const [appLanguage, setAppLanguage] = useState(defaultLanguage);

  const antdLanguage = useMemo(() => {
    return appLanguageMap[appLanguage];
  }, [appLanguage]);

  const setLanguage = (lang: LanguageType) => {
    setAppLanguage(lang);
  };

  return { antdLanguage, setLanguage };
};

export default useI18n;
