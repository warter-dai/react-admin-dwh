export type storeageKey = "openKeys" | "activeKey" | "tabs";

// 获取传入的值的类型
const getValueType = (value: any) => {
  const type = Object.prototype.toString.call(value);
  return type.slice(8, -1);
};

export const createStorage = (
  type: "sessionStorage" | "localStorage" = "sessionStorage"
) => {
  const setStorage = (key: storeageKey, value: any) => {
    const valueType = getValueType(value);
    window[type].setItem(key, JSON.stringify({ type: valueType, value }));
  };

  const getStorage = <T>(key: storeageKey) => {
    const value = window[type].getItem(key);
    if (value) {
      const { value: val } = JSON.parse(value);
      return val as T;
    } else {
      return value as T;
    }
  };

  /**
   * 获取多个缓存值
   * @param keys 缓存键
   * @returns
   */
  const getStorageValues = (keys: storeageKey[]) => {
    const values: storeageKey[] = [];
    keys.forEach((key) => {
      values.push(getStorage(key));
    });
    return values;
  };

  const removeStorage = (key: storeageKey) => {
    window[type].removeItem(key);
  };

  const clear = (excludes?: storeageKey[]) => {
    // 获取排除项
    const keys = Object.keys(window[type]);
    const defaultExcludes = ["dynamicRouter", "serverDynamicRouter"];
    const excludesArr = excludes
      ? [...excludes, ...defaultExcludes]
      : defaultExcludes;
    const excludesKeys = excludesArr
      ? keys.filter((key) => !excludesArr.includes(key))
      : keys;
    // 排除项不清除
    excludesKeys.forEach((key) => {
      window[type].removeItem(key);
    });
    // window[type].clear()
  };

  return {
    getStorage,
    getStorageValues,
    setStorage,

    removeStorage,
    clear,
  };
};
