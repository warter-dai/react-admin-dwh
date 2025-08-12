import { Spin } from "antd";
import { Fragment, Suspense, useEffect } from "react";
import type { JSX } from "react";
import { useNProgress } from "@/components/NProgress";

const LazyLoadComponent = ({
  Component,
}: {
  Component: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  const msg = "加载中...";
  const fallback = () => {
    return (
      <Fragment>
        <div
          style={{
            height: "100%",
            width: "100%",
            // backgroundColor: "var(--ant-background-container);",
          }}
        >
          {msg}
          <Spin />
        </div>
      </Fragment>
    );
  };

  const { start, done } = useNProgress();
  start();

  useEffect(() => {
    done();
  });

  return (
    <Suspense fallback={fallback()}>
      <Fragment>
        <Component />
      </Fragment>
    </Suspense>
  );
};

export default LazyLoadComponent;
