import { useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb } from "antd";

import Animator from "@/components/Animator";

import styles from "./index.module.css";
import { Icon } from "@iconify/react";
import type { BreadcrumbItem } from "@/types/global";
import useMenuStore from "@/store/useMenuStore";
import useBreadcrumb from "./useBreadcrumb";

const PageBreadcrumb = () => {
  const { items } = useMenuStore();
  const { getOpenItems } = useBreadcrumb();

  const visibleItems: BreadcrumbItem[] = getOpenItems(items);

  // 获取容器宽度
  const containerRef = useRef<HTMLDivElement>(null);

  function itemRender(currentRoute: BreadcrumbItem) {
    const content = (
      <React.Fragment key={currentRoute.key}>
        {
          <Link to={currentRoute.path as string}>
            {currentRoute.icon ? (
              <Icon fontSize={14} icon={currentRoute.icon as string} />
            ) : null}
            <span>{currentRoute.label || currentRoute.title}</span>
          </Link>
        }
      </React.Fragment>
    );

    return (
      <Animator
        animatekey={`${currentRoute.key}_anim`}
        config={{
          type: "fadeRight",
          duration: 0.2,
          ease: "easeOut",
          variants: {
            animate: { opacity: 1 },
          },
        }}
      >
        {content}
      </Animator>
    );
  }
  return (
    <div className={styles.breadcrumb} ref={containerRef}>
      <Breadcrumb
        className={styles.breadcrumb}
        items={visibleItems}
        itemRender={itemRender}
      />
    </div>
  );
};

export default PageBreadcrumb;
