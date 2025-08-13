import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  defaultRequestInterceptors,
  // defaultResponseInterceptors,
  type AxiosConfig,
} from "./config";

import { REQUEST_TIMEOUT, API_BASE_PATH } from "@/utils/constants";
// import { App } from "antd";

const abortControllerMap: Map<string, AbortController> = new Map();

export const axiosInstance: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: API_BASE_PATH,
});

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController();
  const url = res.url || "";
  res.signal = controller.signal;
  abortControllerMap.set(url, controller);
  return res;
});

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     const url = response.config.url || "";
//     abortControllerMap.delete(url);
//     if (response?.config?.responseType === "blob") {
//       // 文件流
//       return response;
//     } else if (response.data.code === HTTP_SUCCESS_CODE) {
//       return response.data.result;
//     } else {
//       const { message } = App.useApp();
//       message.error(response.data.result.msg || response.data.msg);
//     }
//   },
//   (error: AxiosError) => {
//     const { modal } = App.useApp();
//     modal.error({ content: error.message });
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(defaultRequestInterceptors);
// axiosInstance.interceptors.response.use(defaultResponseInterceptors);

const service = {
  request: (config: AxiosConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(
          config as any
        ) as AxiosConfig;
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort();
      abortControllerMap.delete(_url);
    }
  },
  cancelAllRequest() {
    for (const abortController of abortControllerMap) {
      abortController[1].abort();
    }
    abortControllerMap.clear();
  },
};

export default service;
