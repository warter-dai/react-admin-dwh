import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

export type HttpMethod = "get" | "post" | "delete" | "put";

export type HttpContentType =
  // | string
  | "text/html"
  | "text/plain"
  | "multipart/form-data"
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "application/octet-stream";

export type AxiosResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

interface HttpHeaders {
  [key: string]: HttpContentType;
}

type CommonRequestHeadersList =
  // | string
  | "Accept"
  | "Content-Length"
  | "User-Agent"
  | "Content-Encoding"
  | "Authorization";

export type RawAxiosRequestHeaders = Partial<
  HttpHeaders & {
    [Key in CommonRequestHeadersList]: HttpContentType;
  } & {
    "Content-Type": HttpContentType;
  }
>;

export interface AxiosConfig extends RequestConfig {
  params?: any;
  data?: any;
  url?: string;
  method?: HttpMethod | string;
  headers?: RawAxiosRequestHeaders;
  responseType?: AxiosResponseType;
  requestType?: string | any;
}

/**
 * 把对象转为formData
 */
export function JsonFormData(obj: Record<string, any>) {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
}

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === "post" &&
    config.headers["Content-Type"] === "application/x-www-form-urlencoded"
  ) {
    config.data = JSON.stringify(config.data);
  } else if (
    config.method === "post" &&
    config.headers["Content-Type"] === "multipart/form-data" &&
    !(config.data instanceof FormData)
  ) {
    config.data = JsonFormData(config.data);
  }
  if (config.method === "get" && config.params) {
    let url = config.url as string;
    url += "?";
    const keys = Object.keys(config.params);
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
    config.url = url;
  }
  return config;
};

const defaultResponseInterceptors = (response: AxiosResponse) => {
  if (response?.config?.responseType === "blob") {
    // 文件流
    return response;
  } else {
    return response.data;
  }
};

export { defaultResponseInterceptors, defaultRequestInterceptors };
