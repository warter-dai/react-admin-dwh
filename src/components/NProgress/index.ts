import type { NProgressOptions } from "nprogress";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useNProgress = () => {
  NProgress.configure({ showSpinner: false } as NProgressOptions);

  const start = () => {
    NProgress.start();
  };

  const done = () => {
    NProgress.done();
  };

  return {
    start,
    done,
  };
};
