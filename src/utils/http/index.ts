import service from "./service";
import { CONTENT_TYPE, TOKE_KEY } from "@/utils/constants";
import { createStorage } from "@/store/createStorage";
import type { AxiosConfig, HttpContentType } from "./config";

export type ResponseType<T> = {
  code: number;
  data: T;
};

const request = <T>(url: string, option: AxiosConfig) => {
  const { method, params, data, headers, responseType } = option;

  const storage = createStorage("sessionStorage");

  const header: HttpContentType =
    (TOKE_KEY as HttpContentType) ?? "Authorization";

  const req = service.request({
    url: url,
    method,
    params,
    data: data,
    responseType: responseType,
    headers: {
      "Content-Type": CONTENT_TYPE,
      [header]: storage.getStorage("token"),
      ...headers,
    },
  });

  return req as Promise<T>;
};

export { request };

export default {
  get: <T = any>(url: string, option: AxiosConfig) => {
    return request(url, { method: "get", ...option }) as Promise<
      ResponseType<T>
    >;
  },
  post: <T = any>(url: string, option: AxiosConfig) => {
    return request(url, { method: "post", ...option }) as Promise<
      ResponseType<T>
    >;
  },
  delete: <T = any>(url: string, option: AxiosConfig) => {
    return request(url, { method: "delete", ...option }) as Promise<
      ResponseType<T>
    >;
  },
  put: <T = any>(url: string, option: AxiosConfig) => {
    return request(url, { method: "put", ...option }) as Promise<
      ResponseType<T>
    >;
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url);
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest();
  },
};
