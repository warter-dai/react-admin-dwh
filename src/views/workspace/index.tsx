import { useEffect, useRef } from "react";
import styles from "./index.module.css";
import * as echarts from "echarts";
import type { ECBasicOption } from "echarts/types/src/util/types.js";

function Desktop() {
  const echartsRef = useRef<HTMLDivElement>(null);

  const echartsInit = () => {
    const chart = echarts.init(echartsRef.current);

    const options: ECBasicOption = {
      tooltip: {
        trrigger: "item",
      },
      legend: {
        orient: "verticai",
        x: "left",
        y: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: "bold",
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: "50%",
          data: [
            {
              value: 12,
              name: "流程审批",
            },
            {
              value: 122,
              name: "销售订单",
            },
            {
              value: 2,
              name: "生产订单",
            },
            {
              value: 31,
              name: "质量管理",
            },
          ],
        },
      ],
    };

    chart.setOption(options);
  };

  useEffect(() => {
    echartsInit();
  }, [echartsRef.current]);

  return (
    <div className={styles["desktop-main"]}>
      <div className={styles["desktop-container"]}>
        <div
          style={{ height: "80px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["head"]}>销售订单数量</div>
          <div className={styles["content"] + " " + styles["sum"]}>1</div>
        </div>
        <div
          style={{ height: "80px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["head"]}>采购订单数量</div>
          <div className={styles["content"] + " " + styles["sum"]}>99999</div>
        </div>
        <div
          style={{ height: "80px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["head"]}>采购订单数量</div>
          <div className={styles["content"] + " " + styles["sum"]}>99999</div>
        </div>
        <div
          style={{ height: "80px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["head"]}>生产成品数量</div>
          <div className={styles["content"] + " " + styles["sum"]}>99999</div>
        </div>
        <div
          style={{ height: "80px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["head"]}>库存数量</div>
          <div className={styles["content"] + " " + styles["sum"]}>99999</div>
        </div>
      </div>
      <div className={styles["desktop-container"]}>
        <div
          style={{ height: "300px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["title"]}>
            <label className="ellipsis">
              我的代办【<span style={{ color: "red" }}>100</span>】条
            </label>
            <div className={styles["label"]}></div>
          </div>
          <div className={styles["content"]}>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>

            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
            <div className={styles["item-link"] + " ellipsis "}>
              <a href="#">【xxx】采购订单审批流程</a>
            </div>
          </div>
        </div>

        <div
          style={{ height: "300px" }}
          className={styles["desktop-block"] + " flex-2 "}
        >
          <div className={styles["title"]}>
            <label>工作分布图</label>
          </div>
          <div className={styles["content"]}>
            <div style={{ height: "90%", width: "90%" }} ref={echartsRef}></div>
          </div>
        </div>
      </div>
      <div className={styles["desktop-container"]}>
        <div
          style={{ height: "300px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["title"]}>
            <label>区域1</label>
          </div>
          <div className={styles["content"]}></div>
        </div>
      </div>
      <div className={styles["desktop-container"]}>
        <div
          style={{ height: "150px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["title"]}>
            <label>区域2</label>
          </div>
          <div className={styles["content"]}></div>
        </div>
        <div
          style={{ height: "150px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["title"]}>
            <label>区域2</label>
          </div>
          <div className={styles["content"]}></div>
        </div>
        <div
          style={{ height: "150px" }}
          className={styles["desktop-block"] + " flex-1 "}
        >
          <div className={styles["title"]}>
            <label>区域2</label>
          </div>
          <div className={styles["content"]}></div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
