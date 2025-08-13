import type { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "./service";
import { HTTP_SUCCESS_CODE } from "../constants";
import { App } from "antd";
import { Fragment } from "react/jsx-runtime";

export type httpInterceptorProps = {
  children: React.ReactNode;
};

const HttpInterceptor = ({ children }: httpInterceptorProps) => {
  const { modal, message } = App.useApp();
  const abortControllerMap: Map<string, AbortController> = new Map();

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const url = response.config.url || "";
      abortControllerMap.delete(url);
      if (response?.config?.responseType === "blob") {
        // 文件流
        return response;
      } else if (response.data.code === HTTP_SUCCESS_CODE) {
        return response.data.result;
      } else {
        message.error(response.data.msg || response.data.result.msg);
        return Promise.reject(response.data.msg || response.data.result.msg);
      }
    },
    (error: AxiosError) => {
      modal.error({ content: error.message });
      return Promise.reject(error);
    }
  );

  return <Fragment>{children}</Fragment>;
};

export default HttpInterceptor;
