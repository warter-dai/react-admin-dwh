import type { HttpContentType } from "./http/config";

export const HOME_PATH = import.meta.env.VITE_APP_HOME_PATH;

export const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;
/** 项目名称 */
export const APP_TITLE = import.meta.env.VITE_APP_TITLE;
/** 页面底部文案 */
export const APP_FOOTER_CONTENT = import.meta.env.VITE_APP_FOOTER_CONTENT;
/** 请求成功编码 */
export const HTTP_SUCCESS_CODE = import.meta.env.VITE_HTTP_SUCCESS_CODE;
/** 接口前缀 */
export const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;
/**
 * 请求超时时间
 */
export const REQUEST_TIMEOUT = import.meta.env.VITE_REQUEST_TIMEOUT;
/**
 * 请求contentType
 */
export const CONTENT_TYPE: HttpContentType = "application/json";
/** token key */
export const TOKE_KEY = "Authorization";
